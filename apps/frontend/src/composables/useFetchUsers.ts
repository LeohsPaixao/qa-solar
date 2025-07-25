import { useQuery } from '@tanstack/vue-query';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { ApiErrorResponse } from '../types/error.types';
import type { UserList } from '../types/user.types';

const fetchUsers = async (): Promise<UserList> => {
  const response = await api.get<UserList>('/users');
  return response.data;
};

export const useFetchUsers = () => {
  const router = useRouter();

  const query = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2,
  });

  watch(
    () => query.error.value,
    (error: ApiErrorResponse | null) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao buscar usuários';
        const errorStatus = error.response?.status;

        if (errorStatus === 401) {
          toast.error('Sessão expirada. Por favor, faça login novamente.', { autoClose: 5000 });
        } else if (errorStatus === 403) {
          toast.error('Acesso negado.', { autoClose: 5000 });
          router.push('/profile');
        } else {
          toast.error(errorMessage, { autoClose: 5000 });
        }
      }
    },
  );

  return query;
};
