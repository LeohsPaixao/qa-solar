import { useMutation } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import api from '../services/api'

const registerUser = async (userData) => {
  const response = await api.post('/register', userData)
  return response.data
}

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message, { autoClose: 3000 });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage, { autoClose: 5000 });
    },
  });
};
