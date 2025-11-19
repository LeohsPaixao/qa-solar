import { fillUserForm } from '@/shared/fillUserForm';
import { waitUntilDocumentLoaded } from '@/support/mocks/waitUntil';

describe('Tela de Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visitAndwait('/signup');
    waitUntilDocumentLoaded();
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

  it('Deveria ser possível visualizar os erros nos campos do formulário', () => {
    cy.get('[data-testid="input-fullname"]').type(' ', { delay: 0 }).clear().blur();
    cy.get('[data-testid="input-error-fullname"]').should('be.visible');
    cy.get('[data-testid="input-error-fullname"]').should('have.text', 'O Nome Completo é obrigatório.');
    cy.get('[data-testid="input-document"]').type(' ', { delay: 0 }).clear().blur();
    cy.get('[data-testid="input-error-cpfcnpj"]').should('be.visible');
    cy.get('[data-testid="input-error-cpfcnpj"]').should('have.text', 'O CPF/CNPJ é obrigatório.');
    cy.get('[data-testid="input-email"]').type(' ', { delay: 0 }).clear().blur();
    cy.get('[data-testid="input-error-email"]').should('be.visible');
    cy.get('[data-testid="input-error-email"]').should('have.text', 'O Email é obrigatório.');
    cy.get('[data-testid="input-password"]').type(' ', { delay: 0 }).clear().blur();
    cy.get('[data-testid="input-error-password"]').should('be.visible');
    cy.get('[data-testid="input-error-password"]').should('have.text', 'A Senha é obrigatória.');
    cy.get('[data-testid="input-password-confirmation"]').type(' ', { delay: 0 }).clear().blur();
    cy.get('[data-testid="input-error-password-confirmation"]').should('be.visible');
    cy.get('[data-testid="input-error-password-confirmation"]').should('have.text', 'A confirmação de senha é obrigatória.');
  });

  it('Deveria ser possivel cadastrar um usuário', () => {
    fillUserForm();
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Usuário criado com sucesso!');
  });

  it('Deveria ser possivel ir para a tela de login ao clicar no link', () => {
    cy.get('[data-testid="link-go-to-login"]').click();
    cy.get('[data-testid="form-login"]').should('be.visible');
    cy.get('[data-testid="btn-login"]').should('be.visible');
  });
});
