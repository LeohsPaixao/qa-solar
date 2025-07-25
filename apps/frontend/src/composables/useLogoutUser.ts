import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { ApiErrorResponse } from '../types/error.types';
import type { LogoutRequest, LogoutResponse } from '../types/user.types';

const logoutUser = async (): Promise<LogoutResponse> => {
  const token = localStorage.getItem('user-token');
  const response = await api.post<LogoutResponse>('/auth/logout', { token } as LogoutRequest);
  return response.data;
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logoutUser,
  });

  watch(
    () => mutation.data.value,
    async (data: LogoutResponse | undefined) => {
      if (data) {
        queryClient.clear();
        localStorage.removeItem('user-token');
        await router.push('/');

        toast.success(data.message, { autoClose: 3000 });
      }
    },
  );

  watch(
    () => mutation.error.value,
    (error: ApiErrorResponse | null) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao realizar logout';
        localStorage.removeItem('user-token');
        queryClient.clear();
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  );

  return mutation;
};
