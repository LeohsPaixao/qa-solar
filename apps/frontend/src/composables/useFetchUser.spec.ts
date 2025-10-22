import { api } from '@/services/api';
import type { User } from '@/types/user.types';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';

const setQueryData = vi.fn();
vi.mocked(useQueryClient).mockReturnValue({ setQueryData } as any);

import { getUserQuery, useFetchUser } from './useFetchUser';

describe('useFetchUser', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deveria ser uma função', () => {
    expect(useFetchUser).toBeInstanceOf(Function);
  });

  it('Deveria chamar API get e retornar os dados', async () => {
    const mockUserData: User = {
      id: 1,
      full_name: 'Usuário Teste',
      email: 'teste@exemplo.com',
      phone: '11999999999',
      document: '12345678901',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    vi.mocked(api.get).mockResolvedValueOnce({
      data: mockUserData,
    } as AxiosResponse<User>);

    const result = await getUserQuery();

    expect(result).toEqual(mockUserData);
    expect(api.get).toHaveBeenCalledWith('/users/me');
  });

  it('Deveria setar os dados do usuário no query client quando data for retornada', async () => {
    const mockUserData: User = {
      id: 1,
      full_name: 'Usuário Teste',
      email: 'teste@exemplo.com',
      phone: '11999999999',
      document: '12345678901',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    const dataRef = ref<User | undefined>(undefined);

    vi.mocked(useQuery).mockReturnValueOnce({
      data: dataRef,
      error: { value: null },
      isLoading: { value: false },
      isError: { value: false },
      isSuccess: { value: true },
      isFetching: { value: false },
      refetch: vi.fn(),
    } as any);

    useFetchUser();
    dataRef.value = mockUserData;
    await nextTick();

    expect(setQueryData).toHaveBeenCalledWith(['user'], mockUserData);
  });

  it('Deveria retornar os dados do usuário em caso de sucesso', () => {
    const mockUserData: User = {
      id: 1,
      full_name: 'Usuário Teste',
      email: 'teste@exemplo.com',
      phone: '11999999999',
      document: '12345678901',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    vi.mocked(api.get).mockResolvedValueOnce({
      data: mockUserData,
    });

    vi.mocked(useQuery).mockReturnValueOnce({
      data: { value: mockUserData },
      error: { value: null },
      isLoading: { value: false },
      isError: { value: false },
      isSuccess: { value: true }, 
      isFetching: { value: false },
      refetch: vi.fn(),
    } as any);
  
    const { data, isError, isSuccess } = useFetchUser();

    expect(isError.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(data.value).toStrictEqual(mockUserData);
  });

  it('Deveria retornar um erro se a requisição falhar', () => {
    const mockError = {
      response: {
        data: {
          message: 'Erro ao buscar usuário',
        },
      },
    };

    vi.mocked(api.get).mockRejectedValueOnce(mockError);

    vi.mocked(useQuery).mockReturnValueOnce({
      data: { value: null },
      error: { value: mockError },
      isLoading: { value: false },
      isError: { value: true },
      isSuccess: { value: false },
      isFetching: { value: false },
      refetch: vi.fn(),
    } as any);

    const { error, isError, isSuccess, data } = useFetchUser();

    expect(isError.value).toBe(true);
    expect(isSuccess.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toStrictEqual(mockError);
  });
});