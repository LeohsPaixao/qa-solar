import { faker } from '@faker-js/faker';
import { generateValidCPF } from './generateValidCPF';

/**
 * Esta função preenche um formulário de usuário com dados gerados aleatoriamente usando Cypress e Faker.js.
 *
 * @observações
 * A função utiliza os atributos data-testid para localizar campos específicos no formulário e digita os dados gerados.
 *
 * @exemplo
 * ```typescript
 * fillUserForm();
 * ```
 *
 * @retorno {void} A função não retorna nenhum valor.
 */
export function fillUserForm() {
  const cpf = generateValidCPF();

  const formFields = [
    { element: cy.get('[data-testid="input-fullname"]'), valor: faker.person.fullName() },
    { element: cy.get('[data-testid="input-socialname"]'), valor: faker.person.middleName() },
    { element: cy.get('[data-testid="input-document"]'), valor: cpf },
    { element: cy.get('[data-testid="input-phone"]'), valor: faker.phone.number({ style: 'national' }) },
    { element: cy.get('[data-testid="input-email"]'), valor: faker.internet.email({ provider: 'example.qa.solar' }) },
    { element: cy.get('[data-testid="input-password"]'), valor: '123456' },
  ];

  for (const field of formFields) {
    field.element.type(field.valor);
  }
}
