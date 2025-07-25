import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { ApiErrorResponse } from '../types/error.types';
import type { UpdateUserData, UpdateUserResponse } from '../types/user.types';

const updateUser = async (userData: UpdateUserData): Promise<UpdateUserResponse> => {
  const response = await api.patch<UpdateUserResponse>('/users/me', userData);
  return response.data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
  });

  watch(
    () => mutation.data.value,
    (data: UpdateUserResponse | undefined) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success(data.message, { autoClose: 3000 });
      }
    },
  );

  watch(
    () => mutation.error.value,
    (error: ApiErrorResponse | null) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao atualizar usuário';
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  );

  return mutation;
};
