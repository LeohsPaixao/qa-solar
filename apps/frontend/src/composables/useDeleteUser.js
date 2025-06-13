import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const deleteUser = async (userIds) => {
  const response = await api.delete('/users/delete', { data: { ids: userIds } });
  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users']);
      toast.success(data.message || 'Usuário(s) excluído(s) com sucesso!', { autoClose: 3000 });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao excluir usuário(s)';
      const errorStatus = error.response?.status;

      if (errorStatus === 401) {
        toast.error('Sessão expirada. Por favor, faça login novamente.', { autoClose: 5000 });
      } else if (errorStatus === 403) {
        toast.error('Você não tem permissão para excluir usuários.', { autoClose: 5000 });
      } else {
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  });
};
