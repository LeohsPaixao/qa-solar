import { useQuery } from '@tanstack/vue-query';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import type { ApiErrorResponse } from '../types/error.types';
import type { User } from '../types/user.types';

const fetchUser = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const useFetchUser = () => {
  const router = useRouter();

  const query = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });

  watch(
    () => query.error.value,
    (error: ApiErrorResponse | null) => {
      if (error) {
        const errorStatus = error.response?.status;

        if (errorStatus === 401) {
          localStorage.removeItem('user-token');
        } else if (errorStatus === 404) {
          router.push('/');
        }
      }
    },
  );

  return query;
};
