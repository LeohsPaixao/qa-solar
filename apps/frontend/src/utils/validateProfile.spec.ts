import { describe, expect, it } from '../../../../node_modules/vitest/dist/index.js';
import { FormDataProfile } from '../types/user.types';
import { validateProfile } from './validateProfile';

const createMockFormData = (overrides: Partial<FormDataProfile> = {}): FormDataProfile => ({
  full_name: 'John Doe',
  phone: '1234567890',
  ...overrides,
});

describe('validateProfile', () => {
  it('Deveria ser uma função', () => {
    expect(validateProfile).toBeInstanceOf(Function);
  });

  describe('Full Name', () => {
    it('Deveria validar o Full Name com dados válidos', () => {
      const formData = createMockFormData({ full_name: 'João Silva' });
      const result = validateProfile(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.full_name).toBeUndefined();
    });

    it('Deveria validar se o Full Name é obrigatório', () => {
      const formData = createMockFormData({ full_name: '' });
      const result = validateProfile(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.full_name).toBe('O Nome Completo é obrigatório.');
    });

    it('Deveria validar se o Full Name deve conter pelo menos Nome e Sobrenome', () => {
      const formData = createMockFormData({ full_name: 'João' });
      const result = validateProfile(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.full_name).toBe('O Nome Completo deve conter pelo menos Nome e Sobrenome.');
    });

    it('Deveria aceitar nomes com acentos e caracteres especiais', () => {
      const formData = createMockFormData({ full_name: 'José da Silva' });
      const result = validateProfile(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.full_name).toBeUndefined();
    });
  });

  describe('Phone', () => {
    it('Deveria validar o Phone com dados válidos', () => {
      const formData = createMockFormData({ phone: '1234567890' });
      const result = validateProfile(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.phone).toBeUndefined();
    });

    it('Deveria rejeitar Phone com letras', () => {
      const formData = createMockFormData({ phone: '1234567890a' });
      const result = validateProfile(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBe('O telefone deve conter apenas números.');
    });

    it('Deveria rejeitar Phone com mais de 11 dígitos', () => {
      const formData = createMockFormData({ phone: '123456789012' });
      const result = validateProfile(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBe('O telefone deve ter no máximo 11 dígitos.');
    });

    it('Deveria rejeitar Phone com menos de 10 dígitos', () => {
      const formData = createMockFormData({ phone: '123456789' });
      const result = validateProfile(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBe('O telefone deve ter no mínimo 10 dígitos.');
    });
  });
});
