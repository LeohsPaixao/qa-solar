import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { LoginCredentials, LoginResponse } from '../types/user.types';

const loginUser = async (loginData: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', loginData);
  if (response.data.token) {
    localStorage.setItem('user-token', response.data.token);
  }
  return response.data;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
  });

  watch(
    () => mutation.data.value,
    async (data: LoginResponse | undefined) => {
      if (data) {
        queryClient.resetQueries();
        queryClient.invalidateQueries();

        if (data.token) {
          await router.push('/home');

          toast.success(data.message || 'Login realizado com sucesso', { autoClose: 3000 });
        }
      }
    },
  );

  watch(
    () => mutation.error.value,
    (error: any) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao realizar login';
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  );

  return mutation;
};
