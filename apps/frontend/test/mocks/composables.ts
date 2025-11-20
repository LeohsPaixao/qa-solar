import { vi } from 'vitest';
import type { User } from '../../src/types/user.types';

// Mock do useFetchUser
export const mockUseFetchUser = vi.fn(() => ({
  data: {
    value: {
      id: 1,
      full_name: 'Usuário Teste',
      email: 'teste@exemplo.com',
      phone: '11999999999',
      document: '12345678901',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    } as User,
  },
  error: { value: null },
  isLoading: { value: false },
  isError: { value: false },
  isSuccess: { value: true },
  refetch: vi.fn(),
  isFetching: { value: false },
}));

// Mock do useLogout
export const mockUseLogout = vi.fn(() => ({
  mutate: vi.fn(),
  data: { value: null },
  error: { value: null },
  isLoading: { value: false },
  isError: { value: false },
  isSuccess: { value: false },
  isPending: { value: false },
}));

// Mock do useRouter
export const mockUseRouter = vi.fn(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  currentRoute: {
    value: {
      path: '/',
      name: 'home',
      params: {},
      query: {},
    },
  },
}));

// Mock do toast
export const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
};

// Mock do localStorage
export const mockLocalStorage = {
  getItem: vi.fn((key: string) => {
    return key in mockLocalStorage._storage ? mockLocalStorage._storage[key] : null;
  }),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage._storage[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockLocalStorage._storage[key];
  }),
  clear: vi.fn(() => {
    mockLocalStorage._storage = {};
  }),
  _storage: {} as Record<string, string>,
};

// Mock do document
export const mockDocument = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};
