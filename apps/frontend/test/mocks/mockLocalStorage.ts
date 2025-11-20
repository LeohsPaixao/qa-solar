import { vi } from 'vitest';

export const mockLocalStorage: any = {
  getItem: vi.fn((key: string) => {
    return mockLocalStorage._storage[key] ?? null;
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
