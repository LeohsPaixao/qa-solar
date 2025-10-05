import { beforeEach, describe, expect, it } from '../../../../node_modules/vitest/dist/index.js';
import { getAuthToken, isAuthenticated, removeAuthToken } from './isAuthenticated';

describe('isAuthenticated', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Deveria retornar true se o usuário está autenticado', () => {
    localStorage.setItem('user-token', '123');
    expect(isAuthenticated()).toBe(true);
  });

  it('Deveria retornar false se o usuário não está autenticado', () => {
    localStorage.removeItem('user-token');
    expect(isAuthenticated()).toBe(false);
  });

  it('Deveria retornar o token do localStorage', () => {
    localStorage.setItem('user-token', 'abc123');
    expect(getAuthToken()).toBe('abc123');
  });

  it('Deveria remover o token do localStorage', () => {
    localStorage.setItem('user-token', 'abc123');
    removeAuthToken();
    expect(localStorage.getItem('user-token')).toBeNull();
  });
});
