import path from 'path';
import { FrameworkMetadata, ParsedData, Parser, RawFile } from '../types';
import { MochawesomeData, MochawesomeResult, MochawesomeSuite, MochawesomeTest } from '../types/mochawesome.types';

/**
 * Converte duração de milissegundos para segundos
 */
function msToSeconds(ms: number): number {
  return ms / 1000;
}

/**
 * Converte o estado do mochawesome para o status padronizado
 */
function mapStateToStatus(state: string, skipped: boolean, pending: boolean): 'passed' | 'failed' | 'skipped' {
  if (skipped) return 'skipped';
  if (pending || state === 'pending') return 'skipped';
  if (state === 'failed') return 'failed';
  return 'passed';
}

/**
 * Extrai mensagem de erro do objeto err do mochawesome
 */
function extractErrorMessage(err: { message?: string; estack?: string } | {}): string | null {
  if (!err || typeof err !== 'object') return null;

  const errorObj = err as { message?: string; estack?: string };
  if (errorObj.message) {
    return errorObj.message;
  }
  if (errorObj.estack) {
    // Pega apenas a primeira linha do stack trace
    const firstLine = errorObj.estack.split('\n')[0];
    return firstLine || null;
  }
  return null;
}

/**
 * Gera ID único para o teste
 * Formato: spec:testName (ex: spec:login)
 */
function generateTestId(test: MochawesomeTest, filePath: string): string {
  const fileName = path.basename(filePath, path.extname(filePath));
  // Remove espaços e caracteres especiais, mantém apenas alfanuméricos e hífens
  const testName = test.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `spec:${testName}`;
}

/**
 * Extrai todos os testes de uma suite recursivamente com informações do arquivo
 */
function extractTestsFromSuite(
  suite: MochawesomeSuite,
  baseFile: string
): Array<{ test: MochawesomeTest; file: string }> {
  const tests: Array<{ test: MochawesomeTest; file: string }> = [];

  // Usa o arquivo da suite ou o baseFile
  const suiteFile = suite.fullFile || suite.file || baseFile;

  // Adiciona testes diretos da suite
  for (const test of suite.tests) {
    tests.push({ test, file: suiteFile });
  }

  // Processa suites aninhadas recursivamente
  for (const nestedSuite of suite.suites) {
    tests.push(...extractTestsFromSuite(nestedSuite, suiteFile));
  }

  return tests;
}

/**
 * Extrai todos os testes dos results com informações do arquivo
 */
function extractAllTests(results: MochawesomeResult[]): Array<{ test: MochawesomeTest; file: string }> {
  const allTests: Array<{ test: MochawesomeTest; file: string }> = [];

  for (const result of results) {
    // O arquivo base é o arquivo do result
    const baseFile = result.fullFile || result.file || 'unknown';

    // Processa cada suite no result
    for (const suite of result.suites) {
      allTests.push(...extractTestsFromSuite(suite, baseFile));
    }
  }

  return allTests;
}

/**
 * Extrai metadados do mochawesome se disponível
 */
function extractMetadata(data: MochawesomeData): FrameworkMetadata | undefined {
  const metadata: FrameworkMetadata = {};

  // Tenta extrair informações do meta se disponível
  if (data.meta) {
    // Pode conter informações sobre Node, OS, etc.
    // Por enquanto, apenas retorna se houver algo útil
    if (Object.keys(data.meta).length > 0) {
      return metadata;
    }
  }

  return undefined;
}

/**
 * Parser para resultados do Cypress (mochawesome.json)
 */
export const cypressParser: Parser = {
  canParse(file: RawFile): boolean {
    return file.framework === 'cypress-e2e' || file.framework === 'cypress-ct';
  },

  parse(content: unknown, file: RawFile): ParsedData {
    // Valida que o conteúdo é MochawesomeData
    if (!content || typeof content !== 'object') {
      throw new Error('Invalid mochawesome data: content is not an object');
    }

    const data = content as MochawesomeData;

    if (!data.stats || !data.results) {
      throw new Error('Invalid mochawesome data: missing stats or results');
    }

    // Extrai todos os testes com informações do arquivo
    const allTests = extractAllTests(data.results);

    // Converte testes para formato intermediário
    const parsedTests = allTests.map(({ test, file: filePath }) => {
      return {
        id: generateTestId(test, filePath),
        name: test.title,
        status: mapStateToStatus(test.state, test.skipped, test.pending),
        duration_s: msToSeconds(test.duration),
        file: path.basename(filePath),
        tags: [], // Cypress não tem tags nativas no mochawesome
        error: extractErrorMessage(test.err)
      };
    });

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

