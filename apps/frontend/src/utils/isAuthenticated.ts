/**
 * Verifica se o usuário está autenticado.
 * @returns {boolean} true se o usuário está autenticado, false caso contrário
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('user-token');
};
