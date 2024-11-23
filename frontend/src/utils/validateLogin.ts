export function validateEmail(value: string): string {
  if (!value) {
    return 'O email é obrigatório.'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Por favor, insira um email válido.'
  }
  return ''
}

export function validatePassword(value: string): string {
  if (!value) {
    return 'A senha é obrigatória.'
  }
  if (value.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres.'
  }
  return ''
}
