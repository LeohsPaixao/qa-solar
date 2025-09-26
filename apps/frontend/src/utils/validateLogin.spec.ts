import { describe, expect, it } from '../../../../node_modules/vitest/dist/index.js';
import { LoginFormData } from '../types/user.types';
import { validateLoginFormData } from './validateLogin';

const createMockFormData = (overrides: Partial<LoginFormData> = {}): LoginFormData => ({
  email: 'joao.silva@example.com',
  password: '123456',
  ...overrides,
});

describe('validateLoginFormData', () => {
  it('Deveria ser uma função', () => {
    expect(validateLoginFormData).toBeInstanceOf(Function);
  });

  describe('Email', () => {
    it('Deveria validar o Email com dados válidos', () => {
      const formData = createMockFormData({ email: 'joao.silva@example.com' });
      const result = validateLoginFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.email).toBeUndefined();
    });

    it('Deveria validar se o Email é obrigatório', () => {
      const formData = createMockFormData({ email: '' });
      const result = validateLoginFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe('O Email é obrigatório.');
    });

    it('Deveria rejeitar Email inválido', () => {
      const formData = createMockFormData({ email: 'email-invalido' });
      const result = validateLoginFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe('Email inválido.');
    });
  });

  describe('Password', () => {
    it('Deveria validar a Senha com dados válidos', () => {
      const formData = createMockFormData({ password: '123456' });
      const result = validateLoginFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.password).toBeUndefined();
    });

    it('Deveria validar se a Senha é obrigatória', () => {
      const formData = createMockFormData({ password: '' });
      const result = validateLoginFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBe('A Senha é obrigatória.');
    });
  });
});
