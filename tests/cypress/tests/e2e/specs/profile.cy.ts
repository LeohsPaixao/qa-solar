import { faker } from '@faker-js/faker';

describe('Tela de Perfil', () => {
  beforeEach(() => {
    cy.login('generic@example.com', '123456');
    cy.visitAndwait('/profile');
  });

  it('Deveria ser possivel visualizar os elementos da tela de Perfil', () => {
    cy.get('[data-testid="form-profile"]').should('be.visible');
    cy.get('.form-group').should('be.visible');
    cy.get('[data-testid="btn-save-profile"]').should('be.visible').and('be.disabled');
  });

  it('Não deveria ser possivel salvar a alteração sem colocar algum dado no Nome Completo', () => {
    cy.get('[data-testid="btn-save-profile"]').should('be.disabled');
    cy.get('[data-testid="input-fullname-profile"]').type('{selectall} ');
    cy.get('[data-testid="btn-save-profile"]').should('be.enabled').click();
    cy.get('[data-testid="input-error-fulname-profile"]').should('be.visible')
      .and('have.text', 'O Nome Completo é obrigatório.');
  });

  it('Não deveria ser possivel salvar a alteração com apenas o nome', () => {
    cy.get('[data-testid="btn-save-profile"]').should('be.disabled');
    cy.get('[data-testid="input-fullname-profile"]').type('{selectall}testname');
    cy.get('[data-testid="btn-save-profile"]').should('be.enabled').click();
    cy.get('[data-testid="input-error-fulname-profile"]').should('be.visible')
      .and('have.text', 'O Nome Completo deve conter pelo menos Nome e Sobrenome.');
  });

  it('Não deveria ser possivel salvar a alteração com letras no telefone', () => {
    cy.get('[data-testid="btn-save-profile"]').should('be.disabled');
    cy.get('[data-testid="input-phone-profile"]').type('{selectall}testphone');
    cy.get('[data-testid="btn-save-profile"]').should('be.enabled').click();
    cy.get('[data-testid="input-error-phone-profile"]').should('be.visible')
      .and('have.text', 'O telefone deve conter apenas números.');
  });

  it('Não deveria ser possivel salvar a alteração com mais de 11 dígitos no telefone', () => {
    cy.get('[data-testid="btn-save-profile"]').should('be.disabled');
    cy.get('[data-testid="input-phone-profile"]').type('{selectall}1452145214521452');
    cy.get('[data-testid="btn-save-profile"]').should('be.enabled').click();
    cy.get('[data-testid="input-error-phone-profile"]').should('be.visible')
      .and('have.text', 'O telefone deve ter no máximo 11 dígitos.');
  });

  it('Não deveria ser possivel salvar a alteração com menos de 10 dígitos no telefone', () => {
    cy.get('[data-testid="btn-save-profile"]').should('be.disabled');
    cy.get('[data-testid="input-phone-profile"]').type('{selectall}1452');
    cy.get('[data-testid="btn-save-profile"]').should('be.enabled').click();
    cy.get('[data-testid="input-error-phone-profile"]').should('be.visible')
      .and('have.text', 'O telefone deve ter no mínimo 10 dígitos.');
  });

  it('Deveria ser possivel salvar a alteração', () => {
    cy.get('[data-testid="btn-save-profile"]').should('be.disabled');
    cy.get('[data-testid="input-fullname-profile"]').type(`{selectall}${faker.person.fullName()}`);
    cy.get('[data-testid="input-phone-profile"]').type(`{selectall} ${faker.phone.number({ style: 'national' })}`);
    cy.get('[data-testid="input-socialname-profile"]').type(`{selectall} ${faker.person.firstName()}`);
    cy.get('[data-testid="btn-save-profile"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('be.visible').and('have.text', 'Perfil atualizado com sucesso!');
  });
});