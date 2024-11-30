import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const deleteUser = async (userIds) => {
  const response = await api.delete('/user/delete', { data: { ids: userIds } });
  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      queryClient.resetQueries();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao buscar usuário';
      const errorStatus = error.response?.data?.status;

      if (errorStatus === 404) {
        toast.error(errorMessage, { autoClose: 5000 });
      } else if (errorStatus === 401) {
        toast.error('Você não tem autorização para realizar esta ação.', { autoClose: 5000 });
      } else {
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  });
};
