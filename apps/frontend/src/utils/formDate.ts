/**
 * Formata uma data para o formato DD/MM/AAAA, HH:mm.
 *
 * @param dateString - String representando a data a ser formatada.
 * @returns String representando a data formatada.
 */
export function formatDate(dateString?: string): string {
  if (!dateString) {
    return '-';
  }

  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}
