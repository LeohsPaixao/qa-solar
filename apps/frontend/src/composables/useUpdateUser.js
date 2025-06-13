import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const updateUser = async (userData) => {
  const response = await api.patch('/users/me', userData);
  return response.data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      queryClient.invalidateQueries(['user']);
      toast.success('Perfil atualizado com sucesso!', { autoClose: 3000 });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar perfil';
      const errorStatus = error.response?.status;

      if (errorStatus === 401) {
        toast.error('Sessão expirada. Por favor, faça login novamente.', { autoClose: 5000 });
      } else if (errorStatus === 403) {
        toast.error('Você não tem permissão para atualizar este perfil.', { autoClose: 5000 });
      } else {
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  });
};
