import type { FrameworkName, FrameworkResult, SummaryData } from '@/types/results.types';

const RESULTS_BASE_PATH = '/qa-results/processed';

/**
 * Carrega o arquivo de resumo geral
 * @returns Resumo geral
 */
export async function loadSummary(): Promise<SummaryData | null> {
  try {
    const response = await fetch(`${RESULTS_BASE_PATH}/summary.json`);
    if (!response.ok) {
      throw new Error(`Failed to load summary: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading summary:', error);
    return null;
  }
}

/**
 * Carrega os resultados de um framework específico
 * @param framework - Nome do framework
 * @returns Resultados do framework
 */
export async function loadFrameworkResults(framework: FrameworkName): Promise<FrameworkResult | null> {
  try {
    const filename = `${framework}.json`;
    const response = await fetch(`${RESULTS_BASE_PATH}/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${framework}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${framework} results:`, error);
    return null;
  }
}

/**
 * Carrega todos os resultados de frameworks
 * @returns Map de frameworks e seus resultados
 */
export async function loadAllFrameworkResults(): Promise<Map<FrameworkName, FrameworkResult>> {
  const frameworks: FrameworkName[] = ['cypress-ct', 'cypress-e2e', 'jest', 'playwright-e2e', 'robot-e2e', 'selenium-e2e', 'vitest'];

  const results = new Map<FrameworkName, FrameworkResult>();

  await Promise.all(
    frameworks.map(async (framework) => {
      const data = await loadFrameworkResults(framework);
      if (data) {
        results.set(framework, data);
      }
    }),
  );

  return results;
}

/**
 * Formata duração em segundos para string legível
 * @param seconds - Duração em segundos
 * @returns Duração formatada
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds.toFixed(2)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  if (minutes < 60) {
    return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Formata timestamp para data legível
 * @param timestamp - Timestamp
 * @returns Timestamp formatado
 */
export function formatTimestamp(timestamp: string): string {
  try {
    let dateStr = timestamp;
    if (dateStr.includes('T') && !dateStr.includes(':')) {
      dateStr = dateStr.replace(/T(\d{2})-(\d{2})-(\d{2})/, 'T$1:$2:$3');
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return timestamp;
    }
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return timestamp;
  }
}

/**
 * Calcula a taxa de sucesso em porcentagem
 * @param passed - Número de testes passados
 * @param total - Número total de testes
 * @returns Taxa de sucesso em porcentagem
 */
export function calculateSuccessRate(passed: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  return Math.round((passed / total) * 100);
}
