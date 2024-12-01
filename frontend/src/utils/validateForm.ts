import { validateCNPJ, validateCPF } from './validateCpfCnpj';

export interface FormData {
  fullName: string;
  socialName?: string;
  document: string;
  docType: 'cpf' | 'cnpj';
  phone?: string;
  email: string;
  password: string;
}

export interface FormErrors {
  fullName?: string;
  document?: string;
  phone?: string;
  email?: string;
  password?: string;
}

type ValidatorFn = (value: string, formData: FormData) => string | undefined;

const validators: Record<keyof FormErrors, ValidatorFn[]> = {
  fullName: [
    (value) => (!value ? 'O Nome Completo é obrigatório.' : undefined),
    (value) => (!value.includes(' ') ? 'O Nome Completo deve conter pelo menos Nome e Sobrenome.' : undefined),
  ],
  document: [
    (value) => (!value ? 'O CPF/CNPJ é obrigatório.' : undefined),
    (value) => (value.startsWith(' ') ? 'O valor não pode começar com espaço.' : undefined),
    (value, formData) => {
      if (formData.docType === 'cpf' && !validateCPF(value)) return 'CPF inválido.';
      if (formData.docType === 'cnpj' && !validateCNPJ(value)) return 'CNPJ inválido.';
      return undefined;
    },
  ],
  phone: [
    (value) => {
      if (!value) return undefined;

      const normalizedValue = value.replace(/\D/g, '');
      if (!/^\d+$/.test(normalizedValue)) return 'O telefone deve conter apenas números.';
      if (normalizedValue.length > 11) return 'O telefone deve ter no máximo 11 dígitos.';
      if (normalizedValue.length < 10) return 'O telefone deve ter no mínimo 10 dígitos.';

      return undefined;
    },
  ],
  email: [
    (value) => (!value ? 'O Email é obrigatório.' : undefined),
    (value) => (value.startsWith(' ') ? 'O valor não pode começar com espaço.' : undefined),
    (value) => (!/\S+@\S+\.\S+/.test(value) ? 'Email inválido.' : undefined),
  ],
  password: [
    (value) => (!value ? 'A Senha é obrigatória.' : undefined),
    (value) => (value.startsWith(' ') ? 'O valor não pode começar com espaço.' : undefined),
    (value) => (value.length < 6 ? 'A Senha deve ter no mínimo 6 caracteres.' : undefined),
    (value) => (value.length > 20 ? 'A Senha deve ter no máximo 20 caracteres.' : undefined),
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
