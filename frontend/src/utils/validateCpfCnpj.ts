export function validateCPF(cpf: string): boolean {
  const cleanCpf = cpf.replace(/\D/g, "");

  if (cleanCpf.length !== 11 || /^(\d)\1+$/.test(cleanCpf)) {
    return false;
  }

  const calculateDigit = (cpf: string, factor: number): number => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += parseInt(cpf[i]) * (factor - i);
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(cleanCpf, 10);
  const secondDigit = calculateDigit(cleanCpf, 11);

  return firstDigit === parseInt(cleanCpf[9]) && secondDigit === parseInt(cleanCpf[10]);
};

export function validateCNPJ(cnpj: string): boolean {
  const cleanCnpj = cnpj.replace(/\D/g, "");

  if (cleanCnpj.length !== 14 || /^(\d)\1+$/.test(cleanCnpj)) {
    return false;
  }

  const calculateDigit = (cnpj: string, positions: number[]): number => {
    let total = 0;
    for (let i = 0; i < positions.length; i++) {
      total += parseInt(cnpj[i]) * positions[i];
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(cleanCnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const secondDigit = calculateDigit(cleanCnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return firstDigit === parseInt(cleanCnpj[12]) && secondDigit === parseInt(cleanCnpj[13]);
};
