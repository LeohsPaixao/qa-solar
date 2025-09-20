import type { FormDataProfile, FormErrorsProfile, ValidatorFnProfile } from '@/types/user.types';

const validators: Record<keyof FormErrorsProfile, ValidatorFnProfile[]> = {
  full_name: [
    (value) => (!value ? 'O Nome Completo é obrigatório.' : undefined),
    (value) => (!/^[a-zA-ZÀ-ÿ.]+(\s+[a-zA-ZÀ-ÿ.]+)+$/.test(value) ? 'O Nome Completo deve conter pelo menos Nome e Sobrenome.' : undefined),
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
};

/**
 * Valida se um nome completo é fornecido e contém pelo menos nome e sobrenome.
 *
 * Retorna uma mensagem de erro quando o valor está vazio ou não atende ao requisito
 * mínimo de ter pelo menos duas palavras (nome e sobrenome). Caso válido, retorna string vazia.
 *
 * @param value - O nome completo a ser validado
 * @returns Uma mensagem de erro em português ou string vazia quando válido
 */
export function validateFullName(value: string): string {
  if (!value) {
    return 'O Nome Completo é obrigatório.';
  }
  if (!/^[a-zA-ZÀ-ÿ.]+(\s+[a-zA-ZÀ-ÿ.]+)+$/.test(value)) {
    return 'O Nome Completo deve conter pelo menos Nome e Sobrenome.';
  }
  return '';
}

/**
 * Valida um valor de telefone, aceitando entradas com formatação.
 *
 * Retorna uma mensagem de erro quando o valor contém letras, tem menos de 10 ou mais de 11 dígitos (após remover caracteres não alfanuméricos); retorna string vazia quando válido ou quando o valor é vazio.
 *
 * @param value - String de telefone (pode conter espaços, parênteses, traços, etc.)
 * @returns Mensagem de erro em português ou string vazia se o telefone for válido
 */
export function validatePhone(value: string): string {
  if (!value) {
    return '';
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

  return '';
}

/**
 * Valida os campos de um formulário de perfil e retorna se está válido junto com os erros por campo.
 *
 * Executa a bateria de validadores configurados para cada campo e coleta a primeira mensagem de erro
 * de cada um (quando presente).
 *
 * @param formData - Dados do formulário de perfil a serem validados.
 * @returns Um objeto contendo:
 *  - `isValid`: true se nenhum erro foi encontrado;
 *  - `errors`: mapeamento de campos para mensagens de erro (vazio quando não há erros).
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
