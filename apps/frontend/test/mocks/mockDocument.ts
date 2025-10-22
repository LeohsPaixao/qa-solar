import { vi } from 'vitest';

export const mockDocument = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};