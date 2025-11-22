import path from 'path';
import { parseStringPromise } from 'xml2js';
import { FrameworkMetadata, ParsedData, Parser, RawFile } from '../types';
import { RobotData, RobotSuite, RobotTest } from '../types/robot.types';

/**
 * Converte XML do Robot Framework para JSON
 * @param xmlContent - Conteúdo XML como string
 * @returns Dados do Robot Framework convertidos para JSON
 */
async function convertXmlToJson(xmlContent: string): Promise<RobotData> {
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

    return jsonData as RobotData;
  } catch (error) {
    throw new Error(`Error converting Robot Framework XML to JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Converte duração de segundos (Robot Framework usa segundos) para segundos
 * O Robot Framework já retorna em segundos, então apenas valida
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
 * Converte status do Robot Framework para status padronizado
 */
function mapStatusToStandard(status: 'PASS' | 'FAIL' | 'SKIP' | 'NOT RUN' | string): 'passed' | 'failed' | 'skipped' {
  if (status === 'PASS') return 'passed';
  if (status === 'FAIL') return 'failed';
  if (status === 'SKIP' || status === 'NOT RUN') return 'skipped';
  return 'failed'; // Default para failed se status desconhecido
}

/**
 * Extrai mensagem de erro do teste do Robot Framework
 */
function extractErrorMessage(test: RobotTest): string | null {
  const status = test.status?.[0];

  if (!status || status.$.status !== 'FAIL') {
    return null;
  }

  // Extrai mensagens de erro dos status
  const errorMessages: string[] = [];

  if (status.msg) {
    for (const msg of status.msg) {
      if (msg.$?.level === 'ERROR' || msg.$?.level === 'FAIL') {
        const messageText = msg._ || '';
        if (messageText.trim()) {
          errorMessages.push(messageText.trim());
        }
      }
    }
  }

  // Se não encontrou mensagens de erro no status, procura nas keywords
  if (errorMessages.length === 0 && test.kw) {
    for (const kw of test.kw) {
      if (kw.status) {
        for (const kwStatus of kw.status) {
          if (kwStatus.$?.status === 'FAIL' && kwStatus.msg) {
            for (const msg of kwStatus.msg) {
              if (msg.$?.level === 'ERROR' || msg.$?.level === 'FAIL') {
                const messageText = msg._ || '';
                if (messageText.trim()) {
                  errorMessages.push(messageText.trim());
                }
              }
            }
          }
        }
      }
    }
  }

  return errorMessages.length > 0 ? errorMessages.join('\n') : null;
}

/**
 * Gera ID único para o teste
 * Formato: fileName:testName
 */
function generateTestId(test: RobotTest, filePath: string): string {
  const fileName = path.basename(filePath, path.extname(filePath));
  const testName = test.$.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
  return `${fileName}:${testName}`;
}

/**
 * Extrai o nome do arquivo do source da suite
 */
function extractFileName(source: string | undefined): string {
  if (!source) return 'unknown.robot';
  return path.basename(source);
}

/**
 * Extrai todos os testes de uma suite recursivamente
 */
function extractAllTests(suites: RobotSuite[]): Array<{ test: RobotTest; file: string }> {
  const allTests: Array<{ test: RobotTest; file: string }> = [];

  for (const suite of suites) {
    const fileName = extractFileName(suite.$.source);

    // Adiciona testes diretos da suite
    if (suite.test) {
      for (const test of suite.test) {
        allTests.push({ test, file: fileName });
      }
    }

    // Processa suites aninhadas recursivamente
    if (suite.suite) {
      allTests.push(...extractAllTests(suite.suite));
    }
  }

  return allTests;
}

/**
 * Extrai metadados do Robot Framework se disponível
 */
function extractMetadata(data: RobotData): FrameworkMetadata | undefined {
  const metadata: FrameworkMetadata = {};

  if (data.robot?.$?.generator) {
    metadata.robot = data.robot.$.generator;
  }

  if (data.robot?.$?.generated) {
    metadata.generated = data.robot.$.generated;
  }

  return Object.keys(metadata).length > 0 ? metadata : undefined;
}

/**
 * Parser para resultados do Robot Framework (output.xml convertido para JSON)
 */
export const robotParser: Parser = {
  canParse: (file: RawFile): boolean => {
    return file.framework === 'robot-e2e';
  },
  parse: async (content: unknown, file: RawFile): Promise<ParsedData> => {
    // Valida que o conteúdo é uma string (XML)
    if (typeof content !== 'string') {
      throw new Error('Invalid robot data: content is not a string (XML)');
    }

    // Converte XML para JSON
    const data = await convertXmlToJson(content);

    if (!data.robot || !data.robot.suite) {
      throw new Error('Invalid robot data: missing robot or suite');
    }

    // Extrai todos os testes de todas as suites
    const allTests = extractAllTests(data.robot.suite);
    const parsedTests: unknown[] = [];

    for (const { test, file: filePath } of allTests) {
      // Pega o status do teste (último status é o final)
      const status = test.status?.[test.status.length - 1];

      if (!status) {
        // Teste sem status, pula
        continue;
      }

      // Determina o status padronizado
      const standardStatus = mapStatusToStandard(status.$.status);

      // Extrai duração (elapsed está em segundos no Robot Framework)
      const duration = secondsToSeconds(status.$.elapsed);

      // Extrai erro se houver
      const error = extractErrorMessage(test);

      parsedTests.push({
        id: generateTestId(test, filePath),
        name: test.$.name,
        status: standardStatus,
        duration_s: duration,
        file: filePath,
        tags: test.tag || [],
        error
      });
    }

    return {
      framework: file.framework,
      timestamp: file.timestamp,
      type: file.type,
      raw: data,
      tests: parsedTests,
      metadata: extractMetadata(data)
    };
  }
};
