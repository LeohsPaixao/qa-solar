/**
 * Verifica se o usuário está autenticado.
 * @returns {boolean} true se o usuário está autenticado, false caso contrário
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('user-token');
};

/**
 * Obtém o token de autenticação do localStorage.
 * @returns {string | null}
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('user-token');
};

/**
 * Remove o token de autenticação do localStorage.
 * @returns {void}
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem('user-token');
};