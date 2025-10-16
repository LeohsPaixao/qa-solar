import { config } from '@vue/test-utils';
import { vi } from 'vitest';
import { globalStubs } from './global-stubs';
import { mockDocument, mockLocalStorage, mockToast, mockUseFetchUser, mockUseLogout, mockUseRouter } from './mocks/composables';

// Mock dos composables
vi.mock('../src/composables/useFetchUser', () => ({
  useFetchUser: mockUseFetchUser,
}));

vi.mock('../src/composables/useLogoutUser', () => ({
  useLogout: mockUseLogout,
}));

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router');
  return {
    ...actual,
    useRouter: mockUseRouter,
  };
});

vi.mock('vue3-toastify', () => ({
  toast: mockToast,
}));

// Mock do localStorage
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

// Mock do document
Object.defineProperty(document, 'addEventListener', {
  value: mockDocument.addEventListener,
  writable: true,
});

Object.defineProperty(document, 'removeEventListener', {
  value: mockDocument.removeEventListener,
  writable: true,
});

config.global.stubs = {
  ...config.global.stubs,
  ...globalStubs,
  'svg-icon': {
    template: '<div data-testid="svg-icon"><slot /></div>',
    props: ['type', 'path'],
  },
};

config.global.mocks = {
  $route: {
    path: '/',
    name: 'home',
    params: {},
    query: {},
  },
  $router: {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  },
};
