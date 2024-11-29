import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

// Função para excluir o usuário no backend
const deleteUser = async (userId) => {
  const response = await api.delete(`/user/delete/${userId}`);
  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (response) => {
      queryClient.invalidateQueries(['user']);
      toast.success(response.message || 'Usuário excluído com sucesso!', {
        autoClose: 3000,
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao excluir usuário.';
      const errorStatus = error.response?.status;

      if (errorStatus === 404) {
        toast.error('Usuário não encontrado.', { autoClose: 5000 });
      } else if (errorStatus === 401) {
        toast.error('Você não tem autorização para realizar esta ação.', { autoClose: 5000 });
      } else {
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  });
};
