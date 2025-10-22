import { api } from '@/services/api';
import type { LoginResponse } from '@/types/user.types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';

const resetQueries = vi.fn();
const invalidateQueries = vi.fn();
vi.mocked(useQueryClient).mockReturnValue({ resetQueries, invalidateQueries } as any);

import { loginUserMutation, useLoginUser } from './useLoginUser';

describe('useLoginUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deveria ser uma função', () => {
    expect(useLoginUser).toBeInstanceOf(Function);
  });

  it('Deveria chamar API post e retornar os dados', async () => {
    const mockResponse: LoginResponse = {
      message: 'Login realizado com sucesso!',
      token: 'mock-jwt-token',
    };

    vi.mocked(api.post<LoginResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<LoginResponse>);

    const result = await loginUserMutation({
      email: 'teste@exemplo.com',
      password: '123456',
    });

    expect(result).toEqual(mockResponse);
    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'teste@exemplo.com',
      password: '123456',
    });
  });

  it('Deveria invalidar e resetar queries quando mutation for bem-sucedida', async () => {
    const mockResponse: LoginResponse = {
      message: 'Login realizado com sucesso!',
      token: 'mock-jwt-token',
    };

    const dataRef = ref<LoginResponse | undefined>(undefined);

    vi.mocked(useMutation).mockReturnValueOnce({
      data: dataRef,
      error: { value: null },
      isLoading: { value: false },
      isError: { value: false },
      isSuccess: { value: false },
      isPending: { value: false },
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
      reset: vi.fn(),
    } as any);

    useLoginUser();
    dataRef.value = mockResponse;
    await nextTick();

    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['user'] });
    expect(resetQueries).toHaveBeenCalled();
  });

  it('Deveria retornar sucesso ao fazer login', () => {
    const mockResponse: LoginResponse = {
      message: 'Login realizado com sucesso!',
      token: 'mock-jwt-token',
    };

    vi.mocked(api.post<LoginResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<LoginResponse>);

    vi.mocked(useMutation).mockReturnValueOnce({
      data: { value: mockResponse },
      error: { value: null },
      isLoading: { value: false },
      isError: { value: false },
      isSuccess: { value: true },
      isPending: { value: false },
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
      reset: vi.fn(),
    } as any);

    const { data, isError, isSuccess } = useLoginUser();

    expect(isError.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(data.value).toStrictEqual(mockResponse);
  });

  it('Deveria retornar erro ao falhar o login', () => {
    const mockError = {
      response: {
        data: {
          message: 'Erro ao realizar login',
        }
      }
    }

    vi.mocked(api.post<LoginResponse>).mockRejectedValueOnce(mockError);

    vi.mocked(useMutation).mockReturnValueOnce({
      data: { value: null },
      error: { value: mockError },
      isLoading: { value: false },
      isError: { value: true },
      isSuccess: { value: false },
      isPending: { value: false },
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
      reset: vi.fn(),
    } as any);

    const { error, isError, isSuccess, data } = useLoginUser();

    expect(isError.value).toBe(true);
    expect(isSuccess.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toStrictEqual(mockError);
  })
});