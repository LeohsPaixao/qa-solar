import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./isAuthenticated', () => ({
  isAuthenticated: vi.fn(),
}));

import { authGuard } from './authGuards';
import { isAuthenticated } from './isAuthenticated';

const mockNext = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('authGuard', () => {
  it('Deveria ser uma função', () => {
    expect(authGuard).toBeInstanceOf(Function);
  });

  it('Deveria permitir acesso se o usuário está autenticado', () => {
    vi.mocked(isAuthenticated).mockReturnValue(true);

    const to = { meta: { requiresAuth: true } };
    const from = {};

    authGuard(to, from, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
  });

  it('Deveria bloquear acesso se o usuário não está autenticado', () => {
    vi.mocked(isAuthenticated).mockReturnValue(false);

    const to = { meta: { requiresAuth: true } };
    const from = {};

    authGuard(to, from, mockNext);

    expect(mockNext).toHaveBeenCalledWith('/');
  });

  it('Deveria permitir acesso se a rota não requer autenticação', () => {
    vi.mocked(isAuthenticated).mockReturnValue(false);

    const to = { meta: {} };
    const from = {};

    authGuard(to, from, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
  });
});
