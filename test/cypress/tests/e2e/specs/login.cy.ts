describe('Tela de Login', () => {

  beforeEach(() => {
    cy.visitAndwait('/')
  })

  it('Deveria ser possivel visualizar os elementos da tela', () => {
    cy.get('[data-testid="form-login"]').should('be.visible')
    cy.get('[data-testid="logo"]').should('be.visible')
    cy.get('[data-testid="input-email"]').should('be.visible')
    cy.get('[data-testid="input-password"]').should('be.visible')
    cy.get('[data-testid="btn-login"]').should('be.visible').and('be.disabled')
  })

  it('Não deveria ser possivel fazer login com a senha inválidas', () => {
    cy.get('[data-testid="btn-login"]').should('be.disabled')
    cy.get('[data-testid="input-email"]').should('be.visible').type('{selectall} generic@example.com')
    cy.get('[data-testid="input-password"]').should('be.visible').type('{selectall} password@example.com')
    cy.get('[data-testid="btn-login"]').should('be.enabled').click()
    cy.get('[data-testid="toast-content"]').should('be.visible').and('have.text', 'A senha não confere.')
  })

  it('Deveria ser possivel fazer login com credenciais válidas', () => {
    cy.get('[data-testid="btn-login"]').should('be.disabled')
    cy.get('[data-testid="input-email"]').should('be.visible').type('{selectall} generic@example.com')
    cy.get('[data-testid="input-password"]').should('be.visible').type('123456')
    cy.get('[data-testid="btn-login"]').should('be.enabled').click()
    cy.get('.Toastify').should('exist')
  })

  it('Não deveria ser possivel fazer login com credenciais inválidas', () => {
    cy.get('[data-testid="btn-login"]').should('be.disabled')
    cy.get('[data-testid="input-email"]').should('be.visible').type('{selectall} email@example.com')
    cy.get('[data-testid="input-password"]').should('be.visible').type('{selectall} password@example.com')
    cy.get('[data-testid="btn-login"]').should('be.enabled').click()
    cy.get('[data-testid="toast-content"]').should('be.visible').and('have.text', 'Não foi possivel realizar login com este usuário.')
  })

  it('Deveria ser possivel ir para a tela de cadastro', () => {
    const baseUrl = Cypress.config('baseUrl');

    cy.get('[data-testid="link-signup"]').should('be.visible').click()
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        `${baseUrl}/signup`,
      );
      expect(loc.origin).to.eq(baseUrl);
      expect(loc.pathname).to.eq('/signup');
      expect(loc.protocol).to.eq('http:');
    });
  })

  it('Deveria ser possivel ir para a tela de esqueci a senha', () => {
    const baseUrl = Cypress.config('baseUrl');

    cy.get('[data-testid="link-recover-password"]').should('be.visible').click()
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        `${baseUrl}/recover-password`,
      );
      expect(loc.origin).to.eq(baseUrl);
      expect(loc.pathname).to.eq('/recover-password');
      expect(loc.protocol).to.eq('http:');
    });
  })
})