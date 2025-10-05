const AUTH_TOKEN_KEY = 'user-token';

/**
 * Verifica se o usuário está autenticado.
 * @returns {boolean} true se o usuário está autenticado, false caso contrário
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Obtém o token de autenticação do localStorage.
 * @returns {string | null}
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * Remove o token de autenticação do localStorage.
 * @returns {void}
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
