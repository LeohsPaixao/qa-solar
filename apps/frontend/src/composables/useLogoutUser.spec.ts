import { api } from '@/services/api';
import { ApiErrorResponse } from '@/types/error.types';
import { LogoutResponse } from '@/types/user.types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosResponse } from 'axios';
import { nextTick, ref } from 'vue';

const clear = vi.fn();
vi.mocked(useQueryClient).mockReturnValue({ clear } as any);

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { logoutUserMutation, useLogout } from './useLogoutUser';

describe('useLogoutUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deveria ser uma função', () => {
    expect(useLogout).toBeInstanceOf(Function);
  });

  it('Deveria chamar API post e retornar os dados', async () => {
    const mockResponse: LogoutResponse = {
      message: 'O usuário foi deslogado com sucesso!',
    };

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue('mock-token'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    vi.mocked(api.post<LogoutResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<LogoutResponse>);

    const result = await logoutUserMutation();

    expect(result).toEqual(mockResponse);
    expect(api.post).toHaveBeenCalledWith('/auth/logout', { token: 'mock-token' });
  });

  it('Deveria invalidar queries quando mutation for bem-sucedida', async () => {
    const mockResponse: LogoutResponse = {
      message: 'O usuário foi deslogado com sucesso!',
    };

    const dataRef = ref<LogoutResponse | undefined>(undefined);

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

    useLogout();
    dataRef.value = mockResponse;
    await nextTick();

    expect(clear).toHaveBeenCalled();
  });

  it('Deveria retornar sucesso ao deslogar o usuário', () => {
    const mockResponse: LogoutResponse = {
      message: 'O usuário foi deslogado com sucesso!',
    };

    const mockMutation = {
      data: { value: mockResponse },
      error: { value: null },
      isLoading: { value: false },
      isError: { value: false },
      isSuccess: { value: true },
      isPending: { value: false },
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
      reset: vi.fn(),
    };

    vi.mocked(useMutation).mockReturnValueOnce(mockMutation as any);

    const result = useLogout();

    expect(result.isError.value).toBe(false);
    expect(result.isSuccess.value).toBe(true);
    expect(result.data.value).toStrictEqual(mockResponse);
  });

  it('Deveria retornar erro ao falhar o logout', () => {
    const mockError: ApiErrorResponse = {
      response: {
        data: {
          message: 'Erro ao deslogar o usuário',
        },
      },
    };

    const mockMutation = {
      data: { value: null },
      error: { value: mockError },
      isLoading: { value: false },
      isError: { value: true },
      isSuccess: { value: false },
      isPending: { value: false },
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
      reset: vi.fn(),
    };

    vi.mocked(useMutation).mockReturnValueOnce(mockMutation as any);

    const result = useLogout();

    expect(result.isError.value).toBe(true);
    expect(result.isSuccess.value).toBe(false);
    expect(result.data.value).toBe(null);
    expect(result.error.value).toStrictEqual(mockError);
  });
});