import { api } from '@/services/api';
import type { User } from '@/types/user.types';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';

export const getUserQuery = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const useFetchUser = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['user'],
    queryFn: getUserQuery,
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

  return query;
};
