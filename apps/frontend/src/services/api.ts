import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse } from '../types/services.types';

// Configuração da API
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

// Função para obter token do localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('user-token');
};

// Função para remover token do localStorage
const removeAuthToken = (): void => {
  localStorage.removeItem('user-token');
};

// Função para redirecionar para login
const redirectToLogin = (): void => {
  window.location.href = '/';
};

// Interceptador de requisição
const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getAuthToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

// Interceptador de resposta
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

// Interceptador de erro
const errorInterceptor = (error: AxiosError<ApiErrorResponse>): Promise<never> => {
  const { response, config } = error;

  // Se for erro 401 (não autorizado) e não for uma requisição de login
  if (response?.status === 401 && !config?.url?.includes('/auth/login')) {
    removeAuthToken();
    redirectToLogin();
  }

  return Promise.reject(error);
};

// Criação da instância do axios
const api: AxiosInstance = axios.create(API_CONFIG);

// Aplicação dos interceptadores
api.interceptors.request.use(requestInterceptor, (error: AxiosError) => {
  return Promise.reject(error);
});

api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;

export type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse };
