import { api } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';

const setQueryData = vi.fn();
const invalidateQueries = vi.fn();
vi.mocked(useQueryClient).mockReturnValue({ setQueryData, invalidateQueries } as any);

import { UpdateUserResponse } from '@/types/user.types';
import { updateUserMutation, useUpdateUser } from './useUpdateUser';

describe('useUpdateUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deveria ser uma função', () => {
    expect(useUpdateUser).toBeInstanceOf(Function);
  });

  it('Deveria chamar API patch e retornar os dados', async () => {
    const mockResponse: UpdateUserResponse = {
      message: 'Usuário alterado com sucesso!',
      user: {
        id: 1,
        full_name: 'Usuário Teste',
        email: 'teste@exemplo.com',
      },
    };

    vi.mocked(api.patch<UpdateUserResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<UpdateUserResponse>);

    const result = await updateUserMutation({
      full_name: 'Usuário Teste',
      email: 'teste@exemplo.com',
    });

    expect(result).toEqual(mockResponse);
    expect(api.patch).toHaveBeenCalledWith('/users/me', { full_name: 'Usuário Teste', email: 'teste@exemplo.com' });
  });

  it('Deveria setar os dados do usuário no query client quando mutation for bem-sucedida', async () => {
    const mockResponse: UpdateUserResponse = {
      message: 'Usuário alterado com sucesso!',
      user: {
        id: 1,
        full_name: 'Usuário Teste',
        email: 'teste@exemplo.com',
      },
    };

    const dataRef = ref<UpdateUserResponse | undefined>(undefined);
    vi.mocked(useMutation).mockReturnValueOnce({
      data: dataRef,
      error: { value: null },
      isLoading: { value: false },
      isError: { value: false },
      isSuccess: { value: true },
      isPending: { value: false },
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
      reset: vi.fn(),
    } as any);

    useUpdateUser();
    dataRef.value = mockResponse;
    await nextTick();

    expect(setQueryData).toHaveBeenCalledWith(['user'], mockResponse.user);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['user'] });
  });

  it('Deveria retornar sucesso ao alterar perfil do usuário', () => {
    const mockResponse: UpdateUserResponse = {
      message: 'Usuário alterado com sucesso!',
      user: {
        id: 1,
        full_name: 'Usuário alterado!',
        email: 'teste@exemplo.com',
      },
    }

    vi.mocked(api.patch<UpdateUserResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<UpdateUserResponse>);

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

    const { data, isError, isSuccess } = useUpdateUser();

    expect(isError.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(data.value).toStrictEqual(mockResponse);
  })

  it('Deveria retornar erro ao falhar a alteração do perfil do usuário', () => {
    const mockError = {
      response: {
        data: {
          message: 'Erro ao alterar perfil',
        },
      },
    };

    vi.mocked(api.patch<UpdateUserResponse>).mockRejectedValueOnce(mockError);

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

    const { error, isError, isSuccess, data } = useUpdateUser();

    expect(isError.value).toBe(true);
    expect(isSuccess.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toStrictEqual(mockError);
  })
});