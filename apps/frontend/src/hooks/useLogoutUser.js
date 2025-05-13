import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

export const logoutUser = async () => {
  const token = localStorage.getItem('user-token');
  const response = await api.post('/auth/logout', { token });

  return response.data;
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async (response) => {
      queryClient.resetQueries();
      queryClient.invalidateQueries();

      localStorage.removeItem('user-token');

      await router.push('/');

      await nextTick(() => {
        toast.success(response.message, { autoClose: 3000 });
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;

      toast.error(errorMessage, { autoClose: 5000 });
    },
  });
};
