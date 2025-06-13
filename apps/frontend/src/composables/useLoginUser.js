import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const loginUser = async (loginData) => {
  const response = await api.post('/auth/login', loginData);
  if (response.data.token) {
    localStorage.setItem('user-token', response.data.token);
  }
  return response.data;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.resetQueries();
      queryClient.invalidateQueries();
      toast.success('Login realizado com sucesso!', { autoClose: 3000 });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao realizar login';
      toast.error(errorMessage, { autoClose: 5000 });
    },
  });
};
