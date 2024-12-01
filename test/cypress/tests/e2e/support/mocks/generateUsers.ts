import { generateValidCPF } from '@/shared/generateValidCPF';
import { faker } from '@faker-js/faker';

function mockGenerateUsers() {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}register`,
    headers: {},
    body: {
      "fullName": faker.person.fullName(),
      "socialName": faker.person.lastName(),
      "document": generateValidCPF(),
      "docType": "cpf",
      "phone": faker.phone.number({ style: 'national' }),
      "email": faker.internet.email({ provider: 'example.qa.solar' }),
      "password": "123456"
    },
  })
}

/**
 * Esta função gera usuários fictícios para fins de teste.
 * Faz uma requisição POST à API para criar 6 novos usuários fictícios.
 *
 * @observações
 * A função utiliza `Cypress._.times` para repetir a execução da função `mockGenerateUsers` 10 vezes.
 *
 * @retorna {void}
 * A função não retorna nenhum valor.
 */
export function generateUsers() {
  Cypress._.times(10, () => mockGenerateUsers())
}