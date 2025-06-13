import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const registerUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.resetQueries();
      queryClient.invalidateQueries();
      toast.success(data.message || 'Usuário registrado com sucesso!', { autoClose: 3000 });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao registrar usuário';
      toast.error(errorMessage, { autoClose: 5000 });
    },
  });
};
