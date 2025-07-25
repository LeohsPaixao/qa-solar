import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { ApiErrorResponse } from '../types/error.types';
import type { LoginCredentials, LoginResponse } from '../types/user.types';

const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

export const useLoginUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginUser,
  });

  watch(
    () => mutation.data.value,
    async (data: LoginResponse | undefined) => {
      if (data) {
        localStorage.setItem('user-token', data.token);
        queryClient.clear();
        await router.push('/profile');
        toast.success(data.message, { autoClose: 3000 });
      }
    },
  );

  watch(
    () => mutation.error.value,
    (error: ApiErrorResponse | null) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao fazer login';
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  );

  return mutation;
};
