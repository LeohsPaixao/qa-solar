/**
 * Obtém o tipo de framework a partir do nome do framework (ct, e2e, unit)
 * @param frameworkName - Nome do framework
 * @returns Tipo de framework
 */
export function getFrameworkType(frameworkName: string): string {
  if (frameworkName.includes('ct')) return 'ct';
  if (frameworkName.includes('e2e')) return 'e2e';
  if (frameworkName.includes('jest') || frameworkName.includes('vitest')) return 'unit';

  return 'default';
}