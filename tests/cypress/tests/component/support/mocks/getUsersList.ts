
/**
 * Realiza o mock de requisição GET para a lista de usuários.
 * @returns {Cypress.Chainable<void>}
 */
export function mockGetUsersList(): Cypress.Chainable<void> {
  return cy.fixture('listUsers.json').then((listUsers) => {
    cy.intercept('GET', '**/users', {
      body: listUsers,
      statusCode: 200,
    });
  });
}