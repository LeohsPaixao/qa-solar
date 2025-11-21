import path from 'path';
import { FrameworkMetadata, ParsedData, Parser, RawFile } from '../types';
import {
  PlaywrightData,
  PlaywrightError,
  PlaywrightSpec,
  PlaywrightSuite,
  PlaywrightTest,
  PlaywrightTestResult
} from '../types/playwright.types';

/**
 * Converte duração de milissegundos para segundos
 */
function msToSeconds(ms: number): number {
  return ms / 1000;
}

/**
 * Converte o status do Playwright para o status padronizado
 */
function mapStatusToStandard(status: 'passed' | 'failed' | 'skipped' | 'timedOut'): 'passed' | 'failed' | 'skipped' {
  if (status === 'passed') return 'passed';
  if (status === 'failed' || status === 'timedOut') return 'failed';
  return 'skipped';
}

/**
 * Extrai mensagem de erro do objeto error do Playwright
 */
function extractErrorMessage(error: PlaywrightError | undefined): string | null {
  if (!error) return null;

  if (error.message) {
    // Remove códigos ANSI de cor se presentes
    return error.message.replace(/\u001b\[[0-9;]*m/g, '');
  }
  if (error.stack) {
    const firstLine = error.stack.split('\n')[0];
    return firstLine.replace(/\u001b\[[0-9;]*m/g, '') || null;
  }
  return null;
}

/**
 * Extrai o erro principal de um array de erros
 */
function extractMainError(errors: PlaywrightError[]): string | null {
  if (errors.length === 0) return null;
  // Pega o primeiro erro que tem mensagem
  for (const error of errors) {
    const message = extractErrorMessage(error);
    if (message) return message;
  }
  return null;
}

/**
 * Gera ID único para o teste
 * Formato: fileName:specTitle
 */
function generateTestId(spec: PlaywrightSpec, filePath: string): string {
  const fileName = path.basename(filePath, path.extname(filePath));
  const specTitle = spec.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
  return `${fileName}:${specTitle}`;
}

/**
 * Obtém o resultado final de um teste (último resultado ou o que não é retry)
 */
function getFinalResult(test: PlaywrightTest): PlaywrightTestResult | null {
  if (test.results.length === 0) return null;
  // Retorna o último resultado (pode ser um retry)
  return test.results[test.results.length - 1];
}

/**
 * Extrai todos os specs de todas as suites
 */
function extractAllSpecs(suites: PlaywrightSuite[]): Array<{ spec: PlaywrightSpec; file: string }> {
  const allSpecs: Array<{ spec: PlaywrightSpec; file: string }> = [];
  for (const suite of suites) {
    for (const nestedSuite of suite.suites) {
      for (const spec of nestedSuite.specs) {
        allSpecs.push({ spec, file: nestedSuite.file });
      }
    }
    for (const spec of suite.specs) {
      allSpecs.push({ spec, file: suite.file });
    }
  }
  return allSpecs;
}

/**
 * Extrai metadados do Playwright se disponível
 */
function extractMetadata(data: PlaywrightData): FrameworkMetadata | undefined {
  const metadata: FrameworkMetadata = {};

  if (data.config?.version) {
    metadata.playwright = data.config.version;
  }

  if (data.config?.metadata?.actualWorkers) {
    metadata.workers = data.config.metadata.actualWorkers as number;
  }

  return Object.keys(metadata).length > 0 ? metadata : undefined;
}

/**
 * Parser para resultados do Playwright (results.json)
 */
export const playwrightParser: Parser = {
  canParse: (file: RawFile): boolean => {
    return file.framework === 'playwright-e2e' || file.framework === 'playwright-ct';
  },
  parse: (content: unknown, file: RawFile): ParsedData => {
    if (!content || typeof content !== 'object') {
      throw new Error('Invalid playwright data: content is not an object');
    }

    const data = content as PlaywrightData;

    if (!data.stats || !data.suites) {
      throw new Error('Invalid playwright data: missing stats or suites');
    }


    const allSpecs = extractAllSpecs(data.suites);
    const parsedTests: unknown[] = [];

    for (const { spec, file: filePath } of allSpecs) {
      // Cada spec pode ter múltiplos tests (devido a retries ou diferentes projetos)
      for (const test of spec.tests) {
        const finalResult = getFinalResult(test);

        if (!finalResult) {
          // Teste sem resultados, pula
          continue;
        }

        // Determina o status baseado no resultado final
        const status = mapStatusToStandard(finalResult.status);

        // Extrai erro se houver
        let error: string | null = null;
        if (finalResult.error) {
          error = extractErrorMessage(finalResult.error);
        } else if (finalResult.errors && finalResult.errors.length > 0) {
          error = extractMainError(finalResult.errors);
        }

        parsedTests.push({
          id: generateTestId(spec, filePath),
          name: spec.title,
          status,
          duration_s: msToSeconds(finalResult.duration),
          file: path.basename(filePath),
          tags: spec.tags || [],
          error
        });
      }
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