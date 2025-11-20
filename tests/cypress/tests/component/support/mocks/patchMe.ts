/**
 * Realiza o mock de requisição PATCH para o usuário logado.
 * @returns {Cypress.Chainable<void>}
 */
export function mockPatchMe(): Cypress.Chainable<void> {
  return cy.fixture('userData.json').then((userData) => {
    cy.intercept('PATCH', '**/users/me', {
      body: {
        message: 'Usuário alterado com sucesso!',
        user: userData,
      },
      statusCode: 200,
    });
  });
}