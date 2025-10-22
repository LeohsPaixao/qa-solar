import { ForgotPasswordFormData } from '@/types/user.types';
import { describe, expect, it } from 'vitest';
import { validateForgotPasswordFormData } from './validateForgotPasswordFormData';

const createMockFormData = (overrides: Partial<ForgotPasswordFormData> = {}): ForgotPasswordFormData => ({
  email: 'joao.silva@example.com',
  ...overrides,
});

describe('validateForgotPasswordFormData', () => {
  it('Deveria ser uma função', () => {
    expect(validateForgotPasswordFormData).toBeInstanceOf(Function);
  });

  it('Deveria validar o Email com dados válidos', () => {
    const formData = createMockFormData({ email: 'joao.silva@example.com' });
    const result = validateForgotPasswordFormData(formData);
    expect(result.isValid).toBe(true);
    expect(result.errors.email).toBeUndefined();
  });

  it('Deveria validar se o Email é obrigatório', () => {
    const formData = createMockFormData({ email: '' });
    const result = validateForgotPasswordFormData(formData);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('O Email é obrigatório.');
  });

  it('Deveria rejeitar Email inválido', () => {
    const formData = createMockFormData({ email: 'email-invalido' });
    const result = validateForgotPasswordFormData(formData);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Email inválido.');
  });
});
