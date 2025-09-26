import { type DocType, type FormData } from '@/types/user.types';
import { describe, expect, it } from '../../../../node_modules/vitest/dist/index.js';
import { validateFormData } from './validateForm';

const createMockFormData = (overrides: Partial<FormData> = {}): FormData => ({
  full_name: 'João Silva',
  document: '11144477735',
  doc_type: 'cpf' as DocType,
  email: 'joao.silva@example.com',
  password: '123456',
  password_confirmation: '123456',
  phone: '11987654321',
  ...overrides,
});

describe('validateFormData', () => {
  it('Deveria ser uma função', () => {
    expect(validateFormData).toBeInstanceOf(Function);
  });

  describe('Full Name', () => {
    it('Deveria validar o Full Name com dados válidos', () => {
      const formData = createMockFormData({ full_name: 'João Silva' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.full_name).toBeUndefined();
    });

    it('Deveria validar se o Full Name é obrigatório', () => {
      const formData = createMockFormData({ full_name: '' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.full_name).toBe('O Nome Completo é obrigatório.');
    });

    it('Deveria validar se o Full Name deve conter pelo menos Nome e Sobrenome', () => {
      const formData = createMockFormData({ full_name: 'João' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.full_name).toBe('O Nome Completo deve conter pelo menos Nome e Sobrenome.');
    });

    it('Deveria aceitar nomes com acentos e caracteres especiais', () => {
      const formData = createMockFormData({ full_name: 'José da Silva' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.full_name).toBeUndefined();
    });
  });

  describe('Document', () => {
    it('Deveria validar o Document com CPF válido', () => {
      const formData = createMockFormData({
        document: '11144477735',
        doc_type: 'cpf' as DocType,
      });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.document).toBeUndefined();
    });

    it('Deveria validar o Document com CNPJ válido', () => {
      const formData = createMockFormData({
        document: '12345678000195',
        doc_type: 'cnpj' as DocType,
      });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.document).toBeUndefined();
    });

    it('Deveria validar se o Document é obrigatório', () => {
      const formData = createMockFormData({ document: '' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.document).toBe('O CPF/CNPJ é obrigatório.');
    });

    it('Deveria validar CPF inválido', () => {
      const formData = createMockFormData({
        document: '12345678900',
        doc_type: 'cpf' as DocType,
      });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.document).toBe('CPF inválido.');
    });

    it('Deveria validar CNPJ inválido', () => {
      const formData = createMockFormData({
        document: '12345678000100',
        doc_type: 'cnpj' as DocType,
      });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.document).toBe('CNPJ inválido.');
    });
  });

  describe('Phone', () => {
    it('Deveria validar o Phone com dados válidos', () => {
      const formData = createMockFormData({ phone: '11987654321' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.phone).toBeUndefined();
    });

    it('Deveria aceitar Phone vazio (opcional)', () => {
      const formData = createMockFormData({ phone: '' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.phone).toBeUndefined();
    });

    it('Deveria rejeitar Phone com letras', () => {
      const formData = createMockFormData({ phone: '1198765432a' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBe('O telefone deve conter apenas números.');
    });

    it('Deveria rejeitar Phone com mais de 11 dígitos', () => {
      const formData = createMockFormData({ phone: '119876543210' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBe('O telefone deve ter no máximo 11 dígitos.');
    });

    it('Deveria rejeitar Phone com menos de 10 dígitos', () => {
      const formData = createMockFormData({ phone: '119876543' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBe('O telefone deve ter no mínimo 10 dígitos.');
    });
  });

  describe('Email', () => {
    it('Deveria validar o Email com dados válidos', () => {
      const formData = createMockFormData({ email: 'joao.silva@example.com' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.email).toBeUndefined();
    });

    it('Deveria validar se o Email é obrigatório', () => {
      const formData = createMockFormData({ email: '' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe('O Email é obrigatório.');
    });

    it('Deveria rejeitar Email inválido', () => {
      const formData = createMockFormData({ email: 'email-invalido' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe('Email inválido.');
    });

    it('Deveria aceitar Email com formato válido', () => {
      const formData = createMockFormData({ email: 'test@domain.co.uk' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.email).toBeUndefined();
    });
  });

  describe('Password', () => {
    it('Deveria validar a Senha com dados válidos', () => {
      const formData = createMockFormData({
        password: '123456',
        password_confirmation: '123456',
      });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.password).toBeUndefined();
    });

    it('Deveria validar se a Senha é obrigatória', () => {
      const formData = createMockFormData({ password: '' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBe('A Senha é obrigatória.');
    });

    it('Deveria rejeitar Senha que começa com espaço', () => {
      const formData = createMockFormData({ password: ' 123456' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBe('O valor não pode começar com espaço.');
    });

    it('Deveria rejeitar Senha com menos de 6 caracteres', () => {
      const formData = createMockFormData({ password: '12345' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBe('A Senha deve ter no mínimo 6 caracteres.');
    });

    it('Deveria rejeitar Senha com mais de 20 caracteres', () => {
      const formData = createMockFormData({ password: '123456789012345678901' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBe('A Senha deve ter no máximo 20 caracteres.');
    });
  });

  describe('Password Confirmation', () => {
    it('Deveria validar a Confirmação de Senha com dados válidos', () => {
      const formData = createMockFormData({
        password: '123456',
        password_confirmation: '123456',
      });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(true);
      expect(result.errors.password_confirmation).toBeUndefined();
    });

    it('Deveria validar se a Confirmação de Senha é obrigatória', () => {
      const formData = createMockFormData({ password_confirmation: '' });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.password_confirmation).toBe('A confirmação de senha é obrigatória.');
    });

    it('Deveria rejeitar Confirmação de Senha diferente da Senha', () => {
      const formData = createMockFormData({
        password: '123456',
        password_confirmation: '654321',
      });
      const result = validateFormData(formData);
      expect(result.isValid).toBe(false);
      expect(result.errors.password_confirmation).toBe('As senhas não coincidem.');
    });
  });
});
