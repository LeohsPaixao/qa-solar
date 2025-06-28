import { waitUntilDocumentLoaded } from '@/support/mocks/waitUntil';

describe('Tela de Home', () => {
  beforeEach(() => {
    cy.login('generic@example.com', '123456');
    cy.visitAndwait('/home');
    waitUntilDocumentLoaded();
  });

  it('Deveria ser possivel visualizar os elementos da tela', () => {
    cy.get('.logo').should('be.visible');
    cy.get('.project-description').should('be.visible').and('include.text', 'Este projeto é Open Source');
  });
});