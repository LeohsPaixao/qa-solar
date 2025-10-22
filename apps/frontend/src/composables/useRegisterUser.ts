import { api } from '@/services/api';
import type { ApiErrorResponse } from '@/types/error.types';
import type { RegisterData, RegisterResponse } from '@/types/user.types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';

export const registerUserMutation = async (userData: RegisterData): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/users', userData);
  return response.data;
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<RegisterResponse, ApiErrorResponse, RegisterData>({
    mutationFn: registerUserMutation,
  });

  watch(
    () => mutation.data.value,
    async (data: RegisterResponse | undefined) => {
      if (data) {
        queryClient.resetQueries();
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    },
  );

  return mutation;
};
