import { api } from '@/services/api';
import type { ApiErrorResponse } from '@/types/error.types';
import type { ForgotPasswordResponse } from '@/types/user.types';
import { useMutation } from '@tanstack/vue-query';
import { AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { sendForgotPasswordEmailMutation, useForgotPassword } from './useForgotPassword';

describe('useForgotPassword', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deveria ser uma função', () => {
    expect(useForgotPassword).toBeInstanceOf(Function);
  });

  it('Deveria chamar API post e retornar os dados', async () => {
    const mockResponse: ForgotPasswordResponse = {
      message: 'Email de recuperação de senha enviado com sucesso!',
    };

    vi.mocked(api.post<ForgotPasswordResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<ForgotPasswordResponse>);

    const result = await sendForgotPasswordEmailMutation({ email: 'teste@exemplo.com' });
    expect(result).toEqual(mockResponse);
    expect(api.post).toHaveBeenCalledWith('/password-recovery/forgot-password', { email: 'teste@exemplo.com' });
  });

  it('Deveria retornar sucesso ao enviar email de recuperação de senha', () => {
    const mockResponse: ForgotPasswordResponse = {
      message: 'Email de recuperação de senha enviado com sucesso!',
    };

    vi.mocked(api.post<ForgotPasswordResponse>).mockResolvedValueOnce({
      data: mockResponse,
    } as AxiosResponse<ForgotPasswordResponse>);

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

    const { data, isError, isSuccess } = useForgotPassword();

    expect(isError.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(data.value).toStrictEqual(mockResponse);
  });

  it('Deveria retornar erro ao enviar email de recuperação de senha', () => {
    const mockError: ApiErrorResponse = {
      response: {
        data: {
          message: 'Erro ao enviar email de recuperação de senha',
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

    const { error, isError, isSuccess, data } = useForgotPassword();

    expect(isError.value).toBe(true);
    expect(isSuccess.value).toBe(false);
    expect(data.value).toBe(null);
    expect(error.value).toStrictEqual(mockError);
  });
});