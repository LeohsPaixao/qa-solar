import { api } from '@/services/api';
import type { UserList } from '@/types/user.types';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';

const setQueryData = vi.fn();
vi.mocked(useQueryClient).mockReturnValue({ setQueryData } as any);

import { getUsersQuery, useFetchUsers } from './useFetchUsers';

describe('useFetchUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deveria ser uma função', () => {
    expect(useFetchUsers).toBeInstanceOf(Function);
  });

  it('Deveria chamar API get e retornar os dados', async () => {
    const mockUsersList: UserList = {
      users: [
        {
          id: 1,
          full_name: 'Usuário Teste',
          email: 'teste@exemplo.com',
          phone: '11999999999',
          document: '12345678901',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          full_name: 'Usuário Teste 2',
          email: 'teste@exemplo.com',
          phone: '11999999999',
          document: '12345678901',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ],
    };

    vi.mocked(api.get).mockResolvedValueOnce({
      data: mockUsersList,
    } as AxiosResponse<UserList>);

    const result = await getUsersQuery();

    expect(result).toEqual(mockUsersList);
    expect(api.get).toHaveBeenCalledWith('/users');
  });

  it('Deveria setar os dados da lista de usuários no query client quando data for retornada', async () => {
    const mockUsersList: UserList = {
      users: [
        {
          id: 1,
          full_name: 'Usuário Teste',
          email: 'teste@exemplo.com',
          phone: '11999999999',
          document: '12345678901',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ],
    };

    const dataRef = ref<UserList | undefined>(undefined);

    vi.mocked(useQuery).mockReturnValueOnce({
      data: dataRef,
      error: { value: null },
      isLoading: { value: false },
      isError: { value: false },
      isSuccess: { value: true },
      isFetching: { value: false },
      refetch: vi.fn(),
    } as any);

    useFetchUsers();
    dataRef.value = mockUsersList;
    await nextTick();

    expect(setQueryData).toHaveBeenCalledWith(['users'], mockUsersList);
  });

  it('Deveria retornar os dados da lista de usuários em caso de sucesso', () => {
    const mockUsersList: UserList = {
      users: [
        {
          id: 1,
          full_name: 'Usuário Teste',
          email: 'teste@exemplo.com',
          phone: '11999999999',
          document: '12345678901',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ],
    };

    vi.mocked(api.get).mockResolvedValueOnce({
      data: mockUsersList,
    } as AxiosResponse<UserList>);

    vi.mocked(useQuery).mockReturnValueOnce({
      data: { value: mockUsersList },
      error: { value: null },
      isLoading: { value: false },
      isError: { value: false },
      isSuccess: { value: true },
      isFetching: { value: false },
      refetch: vi.fn(),
    } as any);

    const { data, isError, isSuccess } = useFetchUsers();

    expect(isError.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(data.value).toStrictEqual(mockUsersList);
  });
});
