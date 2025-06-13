import { useQuery } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1,
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao buscar usuários';
      const errorStatus = error.response?.status;

      if (errorStatus === 401) {
        toast.error('Sessão expirada. Por favor, faça login novamente.', { autoClose: 5000 });
      } else if (errorStatus === 403) {
        toast.error('Você não tem permissão para acessar esta lista.', { autoClose: 5000 });
      } else {
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  });
};
