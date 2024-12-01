describe('Tela de Recuperação de Senha', () => {
  beforeEach(() => {
    cy.visitAndwait('/recover-password');
  });

  it('Deveria ser possivel visulizar os elementos da tela de Recuperação de Senha', () => {
    cy.get('[data-testid="form-recover-password"]').should('be.visible');
    cy.get('[data-testid="input-email-recover-password"]').should('be.visible');
    cy.get('[data-testid="btn-recover-password"]').should('be.visible');
    cy.get('[data-testid="link-go-to-login"]').should('be.visible');
  });

  it('Não deveria ser possivel aparecer o toast de feedback para usuário apenas clicando no botão', () => {
    cy.get('[data-testid="btn-recover-password"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('not.exist');
  });

  it('Deveria ser possivel aparecer um toast de feedback caso coloque um email inválido', () => {
    cy.get('[data-testid="input-email-recover-password"]').type('email@example.com');
    cy.get('[data-testid="btn-recover-password"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Este email não esta cadastrado no banco de dados.');
  });

  it('Deveria ser possivel enviar o email de recuperação de senha', () => {
    cy.get('[data-testid="input-email-recover-password"]').type('generic@example.com');
    cy.get('[data-testid="btn-recover-password"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Um e-mail foi enviado com instruções para recuperar a senha.');
  });

  it('Deveria ser possivel voltar para a tela de login pelo link', () => {
    cy.get('[data-testid="link-go-to-login"]').click();
    cy.get('[data-testid="form-login"]').should('be.visible');
    cy.get('[data-testid="btn-login"]').should('be.visible');
  });
});
