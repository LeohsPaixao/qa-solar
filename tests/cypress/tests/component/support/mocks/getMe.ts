/**
 * Realiza o mock de requisição GET para o usuário logado.
 * @returns {Cypress.Chainable<void>}
*/
export function mockGetMe(): Cypress.Chainable<void> {
  return cy.fixture('userData.json').then((userData) => {
    cy.intercept('GET', '**/users/me', {
      body: userData,
      statusCode: 200,
    });
  });
}