import { api } from '@/services/api';
import type { ApiErrorResponse } from '@/types/error.types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import type { LoginCredentials, LoginResponse } from '../types/user.types';

export const loginUserMutation = async (loginData: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', loginData);
  localStorage.setItem('user-token', response.data.token || '');

  return response.data;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<LoginResponse, ApiErrorResponse, LoginCredentials>({
    mutationFn: loginUserMutation,
  });

  watch(
    () => mutation.data.value,
    async (data: LoginResponse | undefined) => {
      if (data) {
        queryClient.resetQueries();
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  );

  return mutation;
};
