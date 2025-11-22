import path from 'path';
import { ParsedData, Parser, RawFile } from 'src/types';
import { VitestAssertionResult, VitestData, VitestError, VitestTestResult } from '../types/vitest.types';

/**
 * Converte duração de milissegundos para segundos
 * Retorna 0 se o valor for undefined, null ou NaN
 */
function msToSeconds(ms: number | undefined | null): number {
  if (ms === undefined || ms === null || isNaN(ms)) {
    return 0;
  }
  return ms / 1000;
}

function mapStatusToStandard(status: 'passed' | 'failed' | 'pending' | 'skipped' | 'todo'): 'passed' | 'failed' | 'skipped' | 'pending' | 'todo' | 'unknown' {
  if (status === 'passed') return 'passed';
  if (status === 'failed') return 'failed';
  if (status === 'pending') return 'pending';
  if (status === 'skipped') return 'skipped';
  if (status === 'todo') return 'todo';
  return 'unknown';
}

/**
 * Extrai e limpa mensagem de erro do array de failureMessages do Vitest
 * O array pode conter strings (formato original do JSON) ou objetos VitestError
 */
function extractErrorMessage(failureMessages: VitestError[] | string[] | undefined): string | null {
  if (!failureMessages || failureMessages.length === 0) return null;
  
  const firstItem = failureMessages[0];
  
  // Se for array de strings (formato original do JSON)
  if (typeof firstItem === 'string') {
    // Pega a primeira mensagem e limpa os códigos ANSI
    return firstItem.replace(/\u001b\[[0-9;]*m/g, '');
  }
  
  // Se for array de objetos VitestError
  if (firstItem && typeof firstItem === 'object' && 'message' in firstItem) {
    const error = firstItem as VitestError;
    if (error.message) {
      return error.message.replace(/\u001b\[[0-9;]*m/g, '');
    }
  }
  
  return null;
}

/**
 * Gera ID único para o teste
 * Formato: fileName:specTitle
 */
function generateTestId(assertionResult: VitestAssertionResult, filePath: string): string {
  const fileName = path.basename(filePath, path.extname(filePath));
  const specTitle = assertionResult.fullName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
  return `${fileName}:${specTitle}`;
}

/**
 * Extrai todos os assertionResults e o arquivo de cada teste
 * @param testResults - Array de testes do Vitest
 * @returns Array de assertionResults e o arquivo do teste
 */
function extractAllSpecs(testResults: VitestTestResult[]): Array<{ assertionResult: VitestAssertionResult; file: string }> {
  const allSpecs: Array<{ assertionResult: VitestAssertionResult; file: string }> = [];
  for (const testResult of testResults) {
    const fileName = path.basename(testResult.name);
    for (const assertionResult of testResult.assertionResults) {
      allSpecs.push({ assertionResult, file: fileName });
    }
  }

  return allSpecs;
}

/**
 * Parser para resultados do Vitest (results.json)
 */
export const vitestParser: Parser = {
  canParse: (file: RawFile): boolean => {
    return file.framework === 'vitest';
  },
  parse: (content: unknown, file: RawFile): ParsedData => {
    if (!content || typeof content !== 'object') {
      throw new Error('Invalid vitest data: content is not an object');
    }
    const data = content as VitestData;

    const allSpecs = extractAllSpecs(data.testResults);
    const parsedTests: unknown[] = [];

    for (const { assertionResult, file: filePath } of allSpecs) {
      parsedTests.push({
        id: generateTestId(assertionResult, filePath),
        name: assertionResult.fullName,
        status: mapStatusToStandard(assertionResult.status),
        duration_s: msToSeconds(assertionResult.duration),
        file: filePath,
        error: extractErrorMessage(assertionResult.failureMessages)
      });
    }
    return {
      framework: file.framework,
      timestamp: file.timestamp,
      type: file.type,
      raw: data,
      tests: parsedTests,
      metadata: undefined
    };
  }
}