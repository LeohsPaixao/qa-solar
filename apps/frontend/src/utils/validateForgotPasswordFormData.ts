import type { ForgotPasswordFormData, ForgotPasswordFormErrors, ValidatorFnForgotPassword } from '../types/user.types';

const forgotPasswordValidators: Record<keyof ForgotPasswordFormErrors, ValidatorFnForgotPassword[]> = {
  email: [(value) => (!value ? 'O Email é obrigatório.' : undefined), (value) => (!/\S+@\S+\.\S+/.test(value) ? 'Email inválido.' : undefined)],
};

/**
 * Valida os dados do formulário de recuperação de senha
 * @param formData - Os dados do formulário de recuperação de senha a serem validados
 * @returns Um objeto contendo a validade e os erros da validação
 */
export function validateForgotPasswordFormData(formData: ForgotPasswordFormData): { isValid: boolean; errors: ForgotPasswordFormErrors } {
  const errors: ForgotPasswordFormErrors = {};

  for (const [field, fieldValidators] of Object.entries(forgotPasswordValidators)) {
    const fieldValue = formData[field as keyof ForgotPasswordFormData] || '';
    for (const validate of fieldValidators) {
      const error = validate(fieldValue as string, formData);
      if (error) {
        errors[field as keyof ForgotPasswordFormErrors] = error;
        break;
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}