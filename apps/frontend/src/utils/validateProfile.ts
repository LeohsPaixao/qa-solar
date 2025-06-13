export interface FormData {
  fullName: string;
  phone?: string;
}

export interface FormErrors {
  fullName?: string;
  phone?: string;
}

type ValidatorFn = (value: string, formData: FormData) => string | undefined;

const validators: Record<keyof FormErrors, ValidatorFn[]> = {
  fullName: [
    (value) => {
      if (!value.trim()) {
        return 'O Nome Completo é obrigatório.';
      }
      if (value.trim().split(/\s+/).length < 2) {
        return 'O Nome Completo deve conter pelo menos Nome e Sobrenome.';
      }
      if (value !== value.trim()) {
        return 'O Nome Completo não deve começar ou terminar com espaços.';
      }
      return undefined;
    },
  ],
  phone: [
    (value) => {
      if (!value) {
        return undefined;
      }

      const normalizedValue = value.replace(/\D/g, '');
      if (!/^\d+$/.test(normalizedValue)) {
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
};

export function validateProfile(formData: FormData): { isValid: boolean; errors: FormErrors } {
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
