import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { ApiErrorResponse } from '../types/error.types';
import type { DeleteUserRequest, DeleteUserResponse } from '../types/user.types';

const deleteUsers = async (ids: number[]): Promise<DeleteUserResponse> => {
  const response = await api.delete<DeleteUserResponse>('/users/delete', {
    data: { ids } as DeleteUserRequest,
  });
  return response.data;
};

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUsers,
  });

  watch(
    () => mutation.data.value,
    (data: DeleteUserResponse | undefined) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success(data.message, { autoClose: 3000 });
      }
    },
  );

  watch(
    () => mutation.error.value,
    (error: ApiErrorResponse | null) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao excluir usuários';
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  );

  return mutation;
};
