import { waitUntilDocumentLoaded } from '@/support/mocks/waitUntil';

describe('Footer', () => {
  beforeEach(() => {
    cy.login('generic@example.com', '123456');
    cy.visitAndwait('/home');
    waitUntilDocumentLoaded();
  });

  it('Deveria ser possivel visualizar os elementos da tela', () => {
    const year = new Date().getFullYear();

    cy.get('.github-icon').should('be.visible');
    cy.get('.message-footer').should('be.visible').and('include.text', `© ${year} QA Solar - Todos os direitos reservados`);
  });

  it('Deveria ser possivel clicar no botão de github', () => {
    cy.get('.github-link').should('be.visible').invoke('removeAttr', 'target').click();
    cy.url().should('include', 'https://github.com/LeohsPaixao/qa-solar');
  });
});