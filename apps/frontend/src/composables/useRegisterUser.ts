import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { RegisterData, RegisterResponse } from '../types/user.types';

const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/users', userData);
  return response.data;
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: registerUser,
  });

  watch(
    () => mutation.data.value,
    async (data: RegisterResponse | undefined) => {
      if (data) {
        queryClient.resetQueries();
        queryClient.invalidateQueries();
        await router.push('/');
        toast.success(data.message || 'Usuário criado com sucesso!', { autoClose: 3000 });
      }
    },
  );

  watch(
    () => mutation.error.value,
    (error: any) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao registrar usuário';
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  );

  return mutation;
};
