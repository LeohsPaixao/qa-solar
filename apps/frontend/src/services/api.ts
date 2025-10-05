import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse } from '../types/services.types';

const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

/**
 * Obtém o token de autenticação do localStorage.
 * @returns {string | null}
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem('user-token');
};

/**
 * Remove o token de autenticação do localStorage.
 * @returns {void}
 */
const removeAuthToken = (): void => {
  localStorage.removeItem('user-token');
};

/**
 * Interceptador de requisição.
 * @param {InternalAxiosRequestConfig} config - A configuração da requisição.
 * @returns {InternalAxiosRequestConfig}
 */
const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getAuthToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * Interceptador de resposta.
 * @param {AxiosResponse} response - A resposta da requisição.
 * @returns {AxiosResponse}
 */
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/**
 * Interceptador de erro.
 * @param {AxiosError<ApiErrorResponse>} error - O erro da requisição.
 * @returns {Promise<unknown>}
 */
const errorInterceptor = (error: AxiosError<ApiErrorResponse>): Promise<unknown> => {
  const { response, config } = error;

  if (response?.status === 401 && !config?.url?.includes('/auth/login')) {
    removeAuthToken();
    return Promise.reject(error);
  }

  return Promise.reject(error);
};

/**
 * Criação da instância do axios.
 * @returns {AxiosInstance}
 */
const api: AxiosInstance = axios.create(API_CONFIG);

api.interceptors.request.use(requestInterceptor, (error: AxiosError) => {
  return Promise.reject(error);
});

api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;

export { errorInterceptor, getAuthToken, removeAuthToken, requestInterceptor, responseInterceptor };

export type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse };

