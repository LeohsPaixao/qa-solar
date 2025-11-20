import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getAuthToken, isAuthenticated, removeAuthToken } from './isAuthenticated';

describe('isAuthenticated', () => {
  const TOKEN_KEY = 'user-token';

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('Deveria retornar true se o usuário está autenticado', () => {
    localStorage.setItem(TOKEN_KEY, '123');
    expect(isAuthenticated()).toBe(true);
  });

  it('Deveria retornar false se o usuário não está autenticado', () => {
    localStorage.removeItem(TOKEN_KEY);
    expect(isAuthenticated()).toBe(false);
  });

  it('Deveria retornar o token do localStorage', () => {
    localStorage.setItem(TOKEN_KEY, 'abc123');
    expect(getAuthToken()).toBe('abc123');
  });

  it('Deveria remover o token do localStorage', () => {
    localStorage.setItem(TOKEN_KEY, 'abc123');
    removeAuthToken();
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
  });
});
