import { describe, expect, it } from '../../../../node_modules/vitest/dist/index.js';
import { validateCNPJ, validateCPF } from './validateCpfCnpj';

describe('validateCpfCnpj', () => {
  it('Deveria ser uma função', () => {
    expect(validateCPF).toBeInstanceOf(Function);
    expect(validateCNPJ).toBeInstanceOf(Function);
  });

  it('Deveria validar um CPF válido', () => {
    const cpf = '123.456.789-09';
    expect(validateCPF(cpf)).toBe(true);
  });

  it('Deveria validar um CNPJ válido', () => {
    const cnpj = '76.663.428/0001-86';
    expect(validateCNPJ(cnpj)).toBe(true);
  });

  it('Deveria validar se CPF possui 11 dígitos', () => {
    const cpf = '123.45.789-09';
    expect(validateCPF(cpf)).toBe(false);
  });

  it('Deveria validar se CNPJ possui 14 dígitos', () => {
    const cnpj = '76.66.428/0001-86';
    expect(validateCNPJ(cnpj)).toBe(false);
  });

  it('Deveria validar um CPF inválido', () => {
    const cpf = '123.456.789-00';
    expect(validateCPF(cpf)).toBe(false);
  });

  it('Deveria validar um CNPJ inválido', () => {
    const cnpj = '12.456.789/0001-01';
    expect(validateCNPJ(cnpj)).toBe(false);
  });
});
