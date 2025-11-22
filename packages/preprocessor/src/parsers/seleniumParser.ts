import { parseStringPromise } from 'xml2js';
import { FrameworkMetadata, ParsedData, Parser, RawFile } from '../types';
import { MergedSeleniumData, SeleniumData, SeleniumTestCase, SeleniumTestSuite } from '../types/selenium.types';

/**
 * Converte XML do Selenium para JSON
 * @param xmlContent - Conteúdo XML como string
 * @returns Dados do Selenium convertidos para JSON
 */
async function convertXmlToJson(xmlContent: string): Promise<SeleniumData> {
  try {
    const jsonData = await parseStringPromise(xmlContent, {
      explicitArray: true,
      mergeAttrs: false,
      explicitCharkey: false,
      trim: true,
      normalize: true,
      normalizeTags: false,
      attrkey: '$',
      charkey: '_',
      explicitRoot: true
    });

    return jsonData as SeleniumData;
  } catch (error) {
    throw new Error(`Error converting Selenium XML to JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Converte múltiplos XMLs do Selenium para JSON e faz merge
 */
async function convertAndMergeXmls(xmlContents: string[]): Promise<MergedSeleniumData> {
  const testsuites: SeleniumTestSuite[] = [];

  for (const xmlContent of xmlContents) {
    const data = await convertXmlToJson(xmlContent);
    // Extrai apenas o testsuite de cada SeleniumData
    if (data.testsuite) {
      testsuites.push(data.testsuite);
    }
  }

  return { testsuites };
}

/**
 * Converte duração de segundos (Selenium usa segundos) para segundos
 * O Selenium já retorna em segundos, então apenas valida
 */
function secondsToSeconds(seconds: string | number | undefined | null): number {
  if (seconds === undefined || seconds === null) {
    return 0;
  }

  const num = typeof seconds === 'string' ? parseFloat(seconds) : seconds;

  if (isNaN(num)) {
    return 0;
  }

  return num;
}

/**
 * Converte status do Selenium para status padronizado
 */
function mapStatusToStandard(testCase: SeleniumTestCase): 'passed' | 'failed' | 'skipped' {
  // Se tem failure ou error, é failed
  if (testCase.failure && testCase.failure.length > 0) {
    return 'failed';
  }
  if (testCase.error && testCase.error.length > 0) {
    return 'failed';
  }
  // Se tem skipped, é skipped
  if (testCase.skipped && testCase.skipped.length > 0) {
    return 'skipped';
  }
  // Caso contrário, é passed
  return 'passed';
}

/**
 * Extrai mensagem de erro do teste do Selenium
 */
function extractErrorMessage(testCase: SeleniumTestCase): string | null {
  const errorMessages: string[] = [];

  // Extrai mensagens de failure
  if (testCase.failure && testCase.failure.length > 0) {
    for (const failure of testCase.failure) {
      const message = failure.$?.message || failure._ || '';
      if (message.trim()) {
        errorMessages.push(message.trim());
      }
    }
  }

  // Extrai mensagens de error
  if (testCase.error && testCase.error.length > 0) {
    for (const error of testCase.error) {
      const message = error.$?.message || error._ || '';
      if (message.trim()) {
        errorMessages.push(message.trim());
      }
    }
  }

  return errorMessages.length > 0 ? errorMessages.join('\n') : null;
}

/**
 * Gera ID único para o teste
 * Formato: className:testName
 */
function generateTestId(testCase: SeleniumTestCase): string {
  const className = testCase.$.classname
    .split('.')
    .pop() || 'unknown'; // Pega apenas o último segmento (nome da classe)

  const testName = testCase.$.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  return `${className}:${testName}`;
}

/**
 * Extrai o nome do arquivo do classname
 */
function extractFileName(classname: string): string {
  // O classname é algo como "com.qa.solar.LoginTest"
  // Extrai apenas o nome da classe (último segmento)
  const parts = classname.split('.');
  const className = parts[parts.length - 1] || 'unknown';
  return `${className}.java`;
}

/**
 * Extrai metadados do Selenium se disponível
 */
function extractMetadata(data: MergedSeleniumData): FrameworkMetadata | undefined {
  const metadata: FrameworkMetadata = {};

  // Pega informações do primeiro testsuite
  if (data.testsuites && data.testsuites.length > 0) {
    const firstSuite = data.testsuites[0];
    if (firstSuite.$?.hostname) {
      metadata.hostname = firstSuite.$.hostname;
    }
    if (firstSuite.$?.timestamp) {
      metadata.timestamp = firstSuite.$.timestamp;
    }
  }

  return Object.keys(metadata).length > 0 ? metadata : undefined;
}

/**
 * Parser para resultados do Selenium (TEST-*.xml convertido para JSON e mesclado)
 */
export const seleniumParser: Parser = {
  canParse: (file: RawFile): boolean => {
    return file.framework === 'selenium-e2e';
  },
  parse: async (content: unknown, file: RawFile): Promise<ParsedData> => {
    // Valida que o conteúdo é um array de strings (XMLs)
    if (!Array.isArray(content)) {
      throw new Error('Invalid selenium data: content is not an array of XML strings');
    }

    if (content.length === 0) {
      throw new Error('Invalid selenium data: no XML files provided');
    }

    // Converte todos os XMLs para JSON e faz merge
    const mergedData = await convertAndMergeXmls(content as string[]);

    if (!mergedData.testsuites || mergedData.testsuites.length === 0) {
      throw new Error('Invalid selenium data: no testsuites found');
    }

    // Extrai todos os testes de todas as suites
    const parsedTests: unknown[] = [];

    for (const suite of mergedData.testsuites) {

      // Garante que testcase é um array
      const testCases = Array.isArray(suite.testcase) ? suite.testcase : (suite.testcase ? [suite.testcase] : []);

      if (testCases.length === 0) {
        continue;
      }

      for (const testCase of testCases) {
        // Determina o status padronizado
        const standardStatus = mapStatusToStandard(testCase);

        // Extrai duração (time está em segundos no Selenium)
        const duration = secondsToSeconds(testCase.$.time);

        // Extrai erro se houver
        const error = extractErrorMessage(testCase);

        // Extrai nome do arquivo do classname
        const fileName = extractFileName(testCase.$.classname);

        parsedTests.push({
          id: generateTestId(testCase),
          name: testCase.$.name,
          status: standardStatus,
          duration_s: duration,
          file: fileName,
          tags: [], // Selenium não tem tags nativas no XML
          error
        });
      }
    }

    return {
      framework: file.framework,
      timestamp: file.timestamp,
      type: file.type,
      raw: mergedData,
      tests: parsedTests,
      metadata: extractMetadata(mergedData)
    };
  }
};

