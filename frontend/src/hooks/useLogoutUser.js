import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

export const logoutUser = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async (response) => {
      queryClient.resetQueries();
      queryClient.invalidateQueries(['user']);

      localStorage.removeItem('user-email');
      localStorage.removeItem('user-token');

      await router.push('/');

      await nextTick(() => {
        toast.success(response.message, { autoClose: 3000 });
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
