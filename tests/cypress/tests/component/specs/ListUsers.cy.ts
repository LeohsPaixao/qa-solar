import ListUsersTemplate from 'frontend/src/modules/user/components/list/ListUsersTemplate.vue';

describe('Componente de lista de usuários', () => {

  beforeEach(() => {
    cy.intercept('GET', '**/users', {
      fixture: 'listUsers.json',
      statusCode: 200,
      delay: 1000,
    });

    cy.intercept('GET', '**/users/me', {
      fixture: 'userData.json',
      statusCode: 200,
      delay: 1000,
    });
  });

  it('Deveria ser possivel visualizar o componente', () => {
    cy.mount(ListUsersTemplate);
    cy.get('[data-testid="table-users"]').should('exist');
  });

  it('Deveria ser possivel visualizar todos os elementos do componente', () => {
    cy.mount(ListUsersTemplate);
    cy.get('[data-testid="table-users"]').find('tbody tr').should('be.visible').and('have.length', 4);
    cy.get('[data-testid="checkbox-select-all"]').should('exist');
    cy.get('[data-testid="checkbox-select-users"]').should('exist');
    cy.get('[data-testid="btn-delete-user"]').should('exist');
  });

  it('Deveria ser possivel desabilitar o botão de deletar ao não selecionar nenhum usuário', () => {
    cy.mount(ListUsersTemplate);
    cy.get('[data-testid="btn-delete-user"]').should('be.disabled');
  });

  it('Deveria ser possivel habilitar o botão de deletar ao selecionar pelo menos um usuário', () => {
    cy.mount(ListUsersTemplate);
    cy.get('[data-testid="checkbox-select-users"]').last().check();
    cy.get('[data-testid="btn-delete-user"]').should('be.enabled');
  });

  it('Não deveria ser possivel desabilitar o botão de deletar ao selecionar o usuário logado', () => {
    cy.mount(ListUsersTemplate);
    cy.get('[data-testid="checkbox-select-users"]').first().check();
    cy.get('[data-testid="btn-delete-user"]').should('be.disabled');
  });

  it('Deveria ser possivel habilitar o botão de deletar ao selecionar todos os usuários', () => {
    cy.mount(ListUsersTemplate);
    cy.get('[data-testid="checkbox-select-all"]').check();
    cy.get('[data-testid="btn-delete-user"]').should('be.enabled');
  });

  it('Deveria ser possivel visualizar o checkbox de seleção do usuário logado desabilitado ao selecionar todos os usuários', () => {
    cy.mount(ListUsersTemplate);
    cy.get('[data-testid="checkbox-select-all"]').check();
    cy.get('[data-testid="checkbox-select-users"]').first().should('not.be.checked');
  });
});