import { generateUsers } from '@/support/mocks/generateUsers';

describe('Tela de listagem de Usuários', () => {

  before('Mock de Usuários', () => generateUsers());

  beforeEach(() => {
    cy.login('generic@example.com', '123456');
    cy.visitAndwait('/listusers');
  });

  it('Deveria ser possivel visualizar os elementos da tela de listagem de Usuários', () => {
    cy.get('[data-testid="table-users"]').should('be.visible');
    cy.get('[data-testid="checkbox-select-all"]').should('be.visible');
    cy.get('[data-testid="btn-delete-user"]').scrollIntoView().should('be.visible');
  });

  it('Deveria ser possivel selecionar todos os usuários', () => {
    cy.get('[data-testid="checkbox-select-all"]').check();
    cy.get('[data-testid="checkbox-select-all"]').should('be.checked');
  });

  it('Deveria ser possivel selecionar um usuário e exclui-lo', () => {
    cy.get('[data-testid="checkbox-select-users"]').eq(2).check();
    cy.get('[data-testid="btn-delete-user"]').scrollIntoView().click();
    cy.get('[data-testid="toast-content"]').should('be.visible').and('have.text', '1 usuário(s) excluído(s) com sucesso!');
  });
});