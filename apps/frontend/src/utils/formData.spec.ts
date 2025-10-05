import { describe, expect, it } from '../../../../node_modules/vitest/dist/index.js';
import { formatDate } from './formDate';

describe('formData', () => {
  it('Deveria ser uma função', () => {
    expect(formatDate).toBeInstanceOf(Function);
  });

  it('Deveria formatar a data corretamente', () => {
    const date = '2025-01-01';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('01/01/2025, 00:00');
  });

  it('Deveria retornar "-" se a data for inválida', () => {
    const date = 'invalid-date';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('-');
  });

  it('Deveria retornar "-" se a data for undefined', () => {
    const formattedDate = formatDate(undefined);
    expect(formattedDate).toBe('-');
  });
});
