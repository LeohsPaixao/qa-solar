import { beforeEach, describe, expect, it } from '../../../../node_modules/vitest/dist/index.js';
import { isAuthenticated } from './isAuthenticated';

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
});
