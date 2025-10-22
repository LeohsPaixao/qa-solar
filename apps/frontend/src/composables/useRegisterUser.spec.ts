import { api } from '@/services/api';
import type { ApiErrorResponse } from '@/types/error.types';
import { RegisterResponse } from '@/types/user.types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';

const resetQueries = vi.fn();
const invalidateQueries = vi.fn();
vi.mocked(useQueryClient).mockReturnValue({ resetQueries, invalidateQueries } as any);

import { registerUserMutation, useRegisterUser } from './useRegisterUser';

describe('useRegisterUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deveria ser uma função', () => {
    expect(useRegisterUser).toBeInstanceOf(Function);
  });

  it('Deveria chamar API post e retornar os dados', async () => {
    const mockResponse: RegisterResponse = {
      message: 'Usuário criado com sucesso!',
    };

    vi.mocked(api.post<RegisterResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<RegisterResponse>);

    const result = await registerUserMutation({
      full_name: 'Usuário Teste',
      social_name: 'Usuário Teste',
      document: '12345678901',
      doc_type: 'cpf',
      phone: '12345678901',
      email: 'teste@exemplo.com',
      password: '123456',
      password_confirmation: '123456',
    });

    expect(result).toEqual(mockResponse);
    expect(api.post).toHaveBeenCalledWith('/users', {
      full_name: 'Usuário Teste',
      social_name: 'Usuário Teste',
      document: '12345678901',
      doc_type: 'cpf',
      phone: '12345678901',
      email: 'teste@exemplo.com',
      password: '123456',
      password_confirmation: '123456',
    });
  });

  it('Deveria invalidar e resetar queries quando mutation for bem-sucedida', async () => {
    const mockResponse: RegisterResponse = {
      message: 'Usuário criado com sucesso!',
    };

    const dataRef = ref<RegisterResponse | undefined>(undefined);

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

    useRegisterUser();
    dataRef.value = mockResponse;
    await nextTick();

    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['users'] });
    expect(resetQueries).toHaveBeenCalled();
  });

  it('Deveria retornar sucesso ao registrar usuário', () => {
    const mockResponse: RegisterResponse = {
      message: 'Usuário criado com sucesso!',
    };

    vi.mocked(api.post<RegisterResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<RegisterResponse>);

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

    const { data, isError, isSuccess } = useRegisterUser();

    expect(isError.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(data.value).toStrictEqual(mockResponse);
  });

  it('Deveria retornar erro ao falhar ao registrar usuário', () => {
    const mockError: ApiErrorResponse = {
      response: {
        data: {
          message: 'Erro ao registrar usuário',
        },
      },
    };

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

    const { error, isError, isSuccess, data } = useRegisterUser();

    expect(isError.value).toBe(true);
    expect(isSuccess.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toStrictEqual(mockError);
  });
});
