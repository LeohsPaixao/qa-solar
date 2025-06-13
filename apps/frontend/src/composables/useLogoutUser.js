import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const logoutUser = async () => {
  const token = localStorage.getItem('user-token');
  const response = await api.post('/auth/logout', { token });
  return response.data;
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async (data) => {
      // Limpa todos os dados do cache
      queryClient.clear();

      // Remove o token
      localStorage.removeItem('user-token');

      // Redireciona para a página de login
      await router.push('/');

      await nextTick(() => {
        toast.success(data.message || 'Logout realizado com sucesso!', { autoClose: 3000 });
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao realizar logout';

      // Mesmo com erro, limpa os dados locais
      localStorage.removeItem('user-token');
      queryClient.clear();

      toast.error(errorMessage, { autoClose: 5000 });
    },
  });
};
