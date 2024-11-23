import { validateCNPJ, validateCPF } from './validateCpfCnpj'

export interface FormData {
  fullName: string
  socialName?: string
  document: string
  docType: 'cpf' | 'cnpj'
  phone?: string
  email: string
  password: string
}

export interface FormErrors {
  fullName: string
  document: string
  email: string
  password: string
}

export const validateFormData = (formData: FormData): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {
    fullName: '',
    document: '',
    email: '',
    password: '',
  }

  let isValid = true

  // Limpar espaços em branco
  formData.document = formData.document.trim()
  formData.fullName = formData.fullName.trim()
  formData.email = formData.email.trim()

  // Validação do Nome Completo
  if (!formData.fullName) {
    errors.fullName = 'O Nome Completo é obrigatório.'
    isValid = false
  } else if (!formData.fullName.includes(' ')) {
    errors.fullName = 'O Nome Completo deve conter pelo menos Nome e Sobrenome.'
    isValid = false
  }

  // Validação do CPF/CNPJ
  if (!formData.document) {
    errors.document = 'O CPF/CNPJ é obrigatório.'
    isValid = false
  } else if (formData.docType === 'cpf') {
    if (!validateCPF(formData.document)) {
      errors.document = 'CPF inválido.'
      isValid = false
    }
  } else if (formData.docType === 'cnpj') {
    if (!validateCNPJ(formData.document)) {
      errors.document = 'CNPJ inválido.'
      isValid = false
    }
  }

  // Validação do Email
  if (!formData.email) {
    errors.email = 'O Email é obrigatório.'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email inválido.'
    isValid = false
  }

  // Validação da Senha
  if (!formData.password) {
    errors.password = 'A Senha é obrigatória.'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'A Senha deve ter no mínimo 6 caracteres.'
    isValid = false
  } else if (formData.password.length > 20) {
    errors.password = 'A Senha deve ter no máximo 20 caracteres.'
    isValid = false
  }

  return { isValid, errors }
}
