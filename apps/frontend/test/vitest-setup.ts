import { config } from '@vue/test-utils';
import { vi } from 'vitest';
import { globalStubs } from './global-stubs';
import { mockDocument } from './mocks/mockDocument';
import { mockLocalStorage } from './mocks/mockLocalStorage';
import { mockToast } from './mocks/mockToast';
import { mockUseRouter } from './mocks/mockUseRouter';

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

// Mock da API (dependência dos composables)
vi.mock('../src/services/api', async () => {
  const actual = await vi.importActual('../src/services/api');
  return {
    ...actual,
    api: Object.assign(
      vi.fn(), // Torna api uma função
      {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
        patch: vi.fn(),
        defaults: {
          baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        },
        interceptors: {
          request: {
            use: vi.fn(),
          },
          response: {
            use: vi.fn(),
          },
        },
      }
    ),
  };
});

// Mock do Vue Query (dependência dos composables)
vi.mock('@tanstack/vue-query', () => ({
  useQuery: vi.fn(() => ({
    data: { value: null },
    error: { value: null },
    isLoading: { value: false },
    isError: { value: false },
    isSuccess: { value: false },
    isFetching: { value: false },
    refetch: vi.fn(),
  })),
  useMutation: vi.fn(() => ({
    data: { value: null },
    error: { value: null },
    isLoading: { value: false },
    isError: { value: false },
    isSuccess: { value: false },
    isPending: { value: false },
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    reset: vi.fn(),
  })),
  useQueryClient: vi.fn(() => ({
    setQueryData: vi.fn(),
    invalidateQueries: vi.fn(),
    getQueryData: vi.fn(),
  })),
  QueryClient: vi.fn(),
  VueQueryPlugin: vi.fn(),
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
