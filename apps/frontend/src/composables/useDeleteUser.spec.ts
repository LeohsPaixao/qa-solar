import type { ApiErrorResponse } from '@/types/error.types';
import type { DeleteUserResponse } from '@/types/user.types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';

const invalidateQueries = vi.fn();
vi.mocked(useQueryClient).mockReturnValue({ invalidateQueries } as any);

import { api } from '@/services/api';
import { deleteUserMutation, useDeleteUser } from './useDeleteUser';

describe('useDeleteUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deveria ser uma função', () => {
    expect(useDeleteUser).toBeInstanceOf(Function);
  });

  it('Deveria chamar API delete e retornar os dados', async () => {
    const mockResponse: DeleteUserResponse = {
      message: 'Usuário(s) excluído(s) com sucesso!',
      deleted_count: 1,
    };

    vi.mocked(api.delete<DeleteUserResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<DeleteUserResponse>);

    const result = await deleteUserMutation([1]);

    expect(result).toEqual(mockResponse);
    expect(api.delete).toHaveBeenCalledWith('/users/delete', { data: { ids: [1] } });
  });

  it('Deveria invalidar queries quando mutation for bem-sucedida', async () => {
    const mockResponse: DeleteUserResponse = {
      message: 'Usuário(s) excluído(s) com sucesso!',
      deleted_count: 1,
    };

    const dataRef = ref<DeleteUserResponse | undefined>(undefined);

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

    useDeleteUser();

    dataRef.value = mockResponse;
    await nextTick();

    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['users'] });
  });

  it('Deveria retornar sucesso ao excluir usuário', () => {
    const mockResponse: DeleteUserResponse = {
      message: 'Usuário(s) excluído(s) com sucesso!',
      deleted_count: 1,
    };

    vi.mocked(api.delete<DeleteUserResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<DeleteUserResponse>);

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

    const { data, isError, isSuccess } = useDeleteUser();

    expect(isError.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(data.value).toStrictEqual(mockResponse);
  });

  it('Deveria retornar um erro se a requisição falhar', () => {
    const mockError: ApiErrorResponse = {
      response: {
        data: {
          message: 'Erro ao excluir usuário',
        },
      },
    };

    vi.mocked(api.delete).mockRejectedValueOnce(mockError);

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

    const { error, isError, isSuccess, data } = useDeleteUser();

    expect(isError.value).toBe(true);
    expect(isSuccess.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toStrictEqual(mockError);
  });
});
