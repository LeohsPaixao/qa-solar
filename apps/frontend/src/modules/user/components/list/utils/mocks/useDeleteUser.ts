import type { DeleteUserResponse } from '@/types/user.types';
import { vi } from 'vitest';
import { ref } from 'vue';

const mockDeleteUserResponse: DeleteUserResponse = {
  message: 'Usuário excluído com sucesso!',
  deleted_count: 1,
};

const mockMessageError = {
  message: 'Erro ao excluir usuário(s)',
};

vi.mock('@/composables/useDeleteUser', () => ({
  useDeleteUser: () => ({
    mutate: vi.fn((_ids: number[], options?: { onSuccess?: (data: DeleteUserResponse) => void; onError?: (error: any) => void }) => {
      if (options?.onSuccess) {
        options.onSuccess(mockDeleteUserResponse);
      }
      if (options?.onError) {
        options.onError(mockMessageError);
      }
    }),
    isPending: ref(false),
  }),
}));
