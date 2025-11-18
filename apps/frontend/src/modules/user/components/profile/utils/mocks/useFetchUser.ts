import { vi } from 'vitest';
import { ref } from 'vue';

vi.mock('@/composables/useFetchUser', () => ({
  useFetchUser: () => ({
    data: ref({
      id: 1,
      full_name: 'João Silva',
      email: 'joao@example.com',
      phone: '11987654321',
      document: '11144477735',
      social_name: 'João',
    }),
    isLoading: ref(false),
    isError: ref(false),
  }),
}));
