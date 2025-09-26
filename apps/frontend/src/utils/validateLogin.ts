import type { LoginFormData, LoginFormErrors, ValidatorFnLogin } from '../types/user.types';

const loginValidators: Record<keyof LoginFormErrors, ValidatorFnLogin[]> = {
  email: [(value) => (!value ? 'O Email é obrigatório.' : undefined), (value) => (!/\S+@\S+\.\S+/.test(value) ? 'Email inválido.' : undefined)],
  password: [(value) => (!value ? 'A Senha é obrigatória.' : undefined)],
};

/**
 * Valida os dados de login
 * @param formData - Os dados de login a serem validados
 * @returns Um objeto contendo a validade e os erros da validação
 */
export function validateLoginFormData(formData: LoginFormData): { isValid: boolean; errors: LoginFormErrors } {
  const errors: LoginFormErrors = {};

  for (const [field, fieldValidators] of Object.entries(loginValidators)) {
    const fieldValue = formData[field as keyof LoginFormData] || '';
    for (const validate of fieldValidators) {
      const error = validate(fieldValue as string, formData);
      if (error) {
        errors[field as keyof LoginFormErrors] = error;
        break;
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
