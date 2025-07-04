/**
 * Formata uma data para o formato DD/MM/AAAA.
 *
 * @param date - Objeto Date a ser formatado.
 * @returns String representando a data formatada.
 */
export function formatDate(date) {
  if (!(date instanceof Date)) return 'Data inválida';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formata um objeto de data fornecido em uma string no formato "DD/MM/AAAA às HH:mm".
 *
 * @param date - O objeto de data a ser formatado.
 * @returns Uma string representando a data e hora formatadas.
 */
export function formatDateTime(date) {
  if (!(date instanceof Date)) return 'Data inválida';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}
