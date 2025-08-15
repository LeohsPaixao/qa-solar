import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { User } from '../types/user.types';

const fetchUser = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const useFetchUser = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  watch(
    () => query.data.value,
    (data: User | undefined) => {
      if (data) {
        queryClient.setQueryData(['user'], data);
      }
    },
  );

  watch(
    () => query.error.value,
    (error: any) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao buscar usuário';
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  );

  return query;
};
