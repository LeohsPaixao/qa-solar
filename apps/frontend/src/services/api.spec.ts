import { ApiErrorResponse } from '@/types/services.types.js';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { beforeEach, describe, expect, it } from '../../../../node_modules/vitest/dist/index.js';
import { api, errorInterceptor, requestInterceptor, responseInterceptor } from './api';

describe('api', () => {

  const TOKEN_KEY = 'user-token';

  beforeEach(() => {
    localStorage.clear();
  });

  it('Deveria ser uma função', () => {
    expect(api).toBeInstanceOf(Function);
  });

  it('Deveria retornar uma instância do axios com o baseURL correto', () => {
    expect(api.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
  });

  it('Deveria retornar uma instância do axios com o timeout correto', () => {
    expect(api.defaults.timeout).toBe(10000);
  });

  it('Deveria retornar uma instância do axios com o headers correto', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });

  describe('requestInterceptor', () => {
    it('Deveria adicionar o token de autenticação ao header da requisição', () => {
      localStorage.setItem(TOKEN_KEY, 'abc123');
      const config = { headers: {} } as InternalAxiosRequestConfig;
      const result = requestInterceptor(config);
      expect(result.headers.Authorization).toBe('Bearer abc123');
    });

    it('Deveria retornar a configuração da requisição sem o token de autenticação se não houver token no localStorage', () => {
      const config = { headers: {} } as InternalAxiosRequestConfig;
      const result = requestInterceptor(config);
      expect(result.headers.Authorization).toBeUndefined();
    });
  });

  describe('responseInterceptor', () => {
    it('Deveria retornar a resposta da requisição', () => {
      const response = { data: 'abc123' } as AxiosResponse;
      const result = responseInterceptor(response);
      expect(result.data).toBe('abc123');
    });
  });

  describe('errorInterceptor', () => {
    it('Deveria rejeitar a Promise com o erro da requisição', async () => {
      const error = { response: { status: 401 } } as AxiosError<ApiErrorResponse, any>;

      await expect(errorInterceptor(error)).rejects.toBe(error);
    });

    it('Deveria remover o token quando status for 401 e não for rota de login', async () => {
      localStorage.setItem(TOKEN_KEY, 'abc123');
      const error = {
        response: { status: 401 },
        config: { url: '/api/users' },
      } as AxiosError<ApiErrorResponse, any>;

      await expect(errorInterceptor(error)).rejects.toBe(error);
      expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    });

    it('Deveria manter o token quando status for 401 mas for rota de login', async () => {
      localStorage.setItem(TOKEN_KEY, 'abc123');
      const error = {
        response: { status: 401 },
        config: { url: '/auth/login' },
      } as AxiosError<ApiErrorResponse, any>;

      await expect(errorInterceptor(error)).rejects.toBe(error);
      expect(localStorage.getItem(TOKEN_KEY)).toBe('abc123');
    });
  });
});
