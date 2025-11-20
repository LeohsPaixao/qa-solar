import { api } from '@/services/api';
import type { ApiErrorResponse } from '@/types/error.types';
import type { UserList } from '@/types/user.types';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';

export const getUsersQuery = async (): Promise<UserList> => {
  const response = await api.get<UserList>('/users');
  return response.data;
};

export const useFetchUsers = () => {
  const queryClient = useQueryClient();

  const query = useQuery<UserList, ApiErrorResponse>({
    queryKey: ['users'],
    queryFn: getUsersQuery,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  watch(
    () => query.data.value,
    (data: UserList | undefined) => {
      if (data) {
        queryClient.setQueryData(['users'], data);
      }
    },
  );

  return query;
};
