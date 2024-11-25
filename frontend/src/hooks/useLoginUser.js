import { useMutation } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import api from '../services/api'

const loginUser = async (loginData) => {
  const response = await api.post('/login', loginData)
  return response.data
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      toast.success(response.message, { autoClose: 3000 })
      window.localStorage.setItem('user-token', response.token)
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message
      toast.error(errorMessage, { autoClose: 5000 })
    },
  })
}
