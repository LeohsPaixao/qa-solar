import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { UserList } from '../types/user.types';

const fetchUsers = async (): Promise<UserList> => {
  const response = await api.get<UserList>('/users');
  return response.data;
};

export const useFetchUsers = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
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

  watch(
    () => query.error.value,
    (error: any) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao buscar usuários';
        const errorStatus = error.response?.status;

        if (errorStatus === 401) {
          toast.error('Sessão expirada. Por favor, faça login novamente.', { autoClose: 5000 });
        } else if (errorStatus === 403) {
          toast.error('Você não tem permissão para acessar esta lista.', { autoClose: 5000 });
        } else {
          toast.error(errorMessage, { autoClose: 5000 });
        }
      }
    },
  );

  return query;
};
