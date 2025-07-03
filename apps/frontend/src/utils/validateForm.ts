import type { FormData, FormErrors, ValidatorFn } from '../types/user.types';
import { validateCNPJ, validateCPF } from './validateCpfCnpj';

const validators: Record<keyof FormErrors, ValidatorFn[]> = {
  full_name: [
    (value) => (!value ? 'O Nome Completo é obrigatório.' : undefined),
    (value) => (!/^[\w.]+(\s+[\w.]+)+$/.test(value) ? 'O Nome Completo deve conter pelo menos Nome e Sobrenome.' : undefined),
  ],
  document: [
    (value) => (!value ? 'O CPF/CNPJ é obrigatório.' : undefined),
    (value, formData) => {
      if (formData.doc_type === 'cpf' && !validateCPF(value)) {
        return 'CPF inválido.';
      }
      if (formData.doc_type === 'cnpj' && !validateCNPJ(value)) {
        return 'CNPJ inválido.';
      }
      return undefined;
    },
  ],
  phone: [
    (value) => {
      if (!value) {
        return undefined;
      }

      const normalizedValue = value.replace(/[^0-9a-zA-Z]/g, '');
      if (/[a-zA-Z]/.test(normalizedValue)) {
        return 'O telefone deve conter apenas números.';
      }
      if (normalizedValue.length > 11) {
        return 'O telefone deve ter no máximo 11 dígitos.';
      }
      if (normalizedValue.length < 10) {
        return 'O telefone deve ter no mínimo 10 dígitos.';
      }

      return undefined;
    },
  ],
  email: [(value) => (!value ? 'O Email é obrigatório.' : undefined), (value) => (!/\S+@\S+\.\S+/.test(value) ? 'Email inválido.' : undefined)],
  password: [
    (value) => (!value ? 'A Senha é obrigatória.' : undefined),
    (value) => (value.startsWith(' ') ? 'O valor não pode começar com espaço.' : undefined),
    (value) => (value.length < 6 ? 'A Senha deve ter no mínimo 6 caracteres.' : undefined),
    (value) => (value.length > 20 ? 'A Senha deve ter no máximo 20 caracteres.' : undefined),
  ],
  password_confirmation: [
    (value) => (!value ? 'A confirmação de senha é obrigatória.' : undefined),
    (value, formData) => (value !== formData.password ? 'As senhas não coincidem.' : undefined),
  ],
};

export function validateFormData(formData: FormData): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  for (const [field, fieldValidators] of Object.entries(validators)) {
    const fieldValue = formData[field as keyof FormData] || '';
    for (const validate of fieldValidators) {
      const error = validate(fieldValue as string, formData);
      if (error) {
        errors[field as keyof FormErrors] = error;
        break;
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
