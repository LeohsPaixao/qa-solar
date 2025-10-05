import type { FormDataProfile, FormErrorsProfile, ValidatorFnProfile } from '@/types/user.types';

const validators: Record<keyof FormErrorsProfile, ValidatorFnProfile[]> = {
  full_name: [
    (value) => (!value ? 'O Nome Completo é obrigatório.' : undefined),
    (value) => (!/^[a-zA-ZÀ-ÿ.]+(\s+[a-zA-ZÀ-ÿ.]+)+$/.test(value) ? 'O Nome Completo deve conter pelo menos Nome e Sobrenome.' : undefined),
  ],
  phone: [
    (value) => {
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
};

/**
 * Valida os dados do perfil
 * @param formData - Os dados do perfil a serem validados
 * @returns Um objeto contendo a validade e os erros da validação
 */
export function validateProfile(formData: FormDataProfile): { isValid: boolean; errors: FormErrorsProfile } {
  const errors: FormErrorsProfile = {};

  for (const [field, fieldValidators] of Object.entries(validators)) {
    const fieldValue = formData[field as keyof FormDataProfile] || '';
    for (const validate of fieldValidators) {
      const error = validate(fieldValue as string, formData);
      if (error) {
        errors[field as keyof FormErrorsProfile] = error;
        break;
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
