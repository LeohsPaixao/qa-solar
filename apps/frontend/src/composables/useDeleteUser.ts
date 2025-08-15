import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { DeleteUserRequest, DeleteUserResponse } from '../types/user.types';

const deleteUser = async (userIds: number[]): Promise<DeleteUserResponse> => {
  const response = await api.delete<DeleteUserResponse>('/users/delete', {
    data: { ids: userIds } as DeleteUserRequest,
  });
  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUser,
  });

  watch(
    () => mutation.data.value,
    (data: DeleteUserResponse | undefined) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success(data.message || 'Usuário(s) excluído(s) com sucesso!', { autoClose: 3000 });
      }
    },
  );

  watch(
    () => mutation.error.value,
    (error: any) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao excluir usuário(s)';
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  );

  return mutation;
};
