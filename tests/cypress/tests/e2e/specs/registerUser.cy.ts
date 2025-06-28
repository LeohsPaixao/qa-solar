import { fillUserForm } from '@/shared/fillUserForm';

describe('Tela de Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visitAndwait('/signup');
  });

  it('Deveria ser possivel visualizar os elementos da tela de cadastro', () => {
    cy.get('[data-testid="register-form"]').should('be.visible');
    cy.get('[data-testid="input-fullname"]').should('be.visible');
    cy.get('[data-testid="input-document"]').should('be.visible');
    cy.get('[data-testid="input-email"]').should('be.visible');
    cy.get('[data-testid="input-password"]').should('be.visible');
    cy.get('[data-testid="input-password-confirmation"]').should('be.visible');
    cy.get('[data-testid="btn-register"]').should('be.visible');
    cy.get('[data-testid="link-go-to-login"]').should('be.visible');
  });

  it('Deveria ser possivel cadastrar um usuário', () => {
    fillUserForm();
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Usuário cadastrado com sucesso!');
  });

  it('Deveria ser possivel ir para a tela de login ao clicar no link', () => {
    cy.get('[data-testid="link-go-to-login"]').click();
    cy.get('[data-testid="form-login"]').should('be.visible');
    cy.get('[data-testid="btn-login"]').should('be.visible');
  });
});
