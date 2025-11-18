import { vi } from 'vitest';
import { ref } from 'vue';

vi.mock('@/composables/useUpdateUser', () => ({
  useUpdateUser: () => ({
    mutate: vi.fn(),
    isPending: ref(false),
  }),
}));
