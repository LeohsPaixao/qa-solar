/**
 * Formata o nome do framework para exibição
 * @param name - Nome do framework
 * @returns Nome do framework formatado
 */
export function formatFrameworkName(name: string): string {
  const names: Record<string, string> = {
    'cypress-ct': 'Cypress CT',
    'cypress-e2e': 'Cypress E2E',
    jest: 'Jest',
    'playwright-e2e': 'Playwright',
    'robot-e2e': 'Robot Framework',
    'selenium-e2e': 'Selenium',
    vitest: 'Vitest',
  };
  return names[name] || name;
}