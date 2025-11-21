import { NormalizedFrameworkData, ParsedData, TestResult, TestStatus, TestSummary } from '../types';

/**
 * Valida e converte um teste do formato intermediário para TestResult
 */
function validateAndConvertTest(test: unknown): TestResult {
  if (!test || typeof test !== 'object') {
    throw new Error('Invalid test data: test is not an object');
  }

  const testObj = test as Record<string, unknown>;

  // Valida campos obrigatórios
  if (typeof testObj.id !== 'string') {
    throw new Error('Invalid test data: missing or invalid id');
  }
  if (typeof testObj.name !== 'string') {
    throw new Error('Invalid test data: missing or invalid name');
  }
  if (!['passed', 'failed', 'skipped'].includes(testObj.status as string)) {
    throw new Error(`Invalid test data: invalid status ${testObj.status}`);
  }
  if (typeof testObj.duration_s !== 'number') {
    throw new Error('Invalid test data: missing or invalid duration_s');
  }
  if (typeof testObj.file !== 'string') {
    throw new Error('Invalid test data: missing or invalid file');
  }

  return {
    id: testObj.id,
    name: testObj.name,
    status: testObj.status as TestStatus,
    duration_s: testObj.duration_s,
    file: testObj.file,
    tags: Array.isArray(testObj.tags) ? (testObj.tags as string[]) : undefined,
    error: testObj.error !== undefined 
      ? (testObj.error === null ? null : String(testObj.error))
      : undefined
  };
}

/**
 * Calcula o summary baseado nos testes
 */
function calculateSummary(tests: TestResult[]): TestSummary {
  const summary: TestSummary = {
    total: tests.length,
    passed: 0,
    failed: 0,
    skipped: 0,
    duration_s: 0
  };

  for (const test of tests) {
    // Conta por status
    if (test.status === 'passed') {
      summary.passed++;
    } else if (test.status === 'failed') {
      summary.failed++;
    } else if (test.status === 'skipped') {
      summary.skipped++;
    }

    // Soma a duração
    summary.duration_s += test.duration_s;
  }

  return summary;
}

/**
 * Normalize the parsed data to the standard format
 * @param parsed - the parsed data
 * @returns the normalized data
 */
export function normalize(parsed: ParsedData): NormalizedFrameworkData {
  // Valida que há testes
  if (!Array.isArray(parsed.tests)) {
    throw new Error('Invalid parsed data: tests is not an array');
  }

  // Converte e valida todos os testes
  const normalizedTests: TestResult[] = [];
  for (const test of parsed.tests) {
    try {
      normalizedTests.push(validateAndConvertTest(test));
    } catch (error) {
      // Log erro mas continua processando outros testes
      console.error('Error validating test:', error);
    }
  }

  // Calcula o summary baseado nos testes normalizados
  const summary = calculateSummary(normalizedTests);

  return {
    framework: parsed.framework,
    timestamp: parsed.timestamp,
    summary,
    tests: normalizedTests,
    metadata: parsed.metadata
  };
}