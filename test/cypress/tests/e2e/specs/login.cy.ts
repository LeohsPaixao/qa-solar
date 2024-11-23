describe('Tela de Login', () => {

  beforeEach(() => {
    cy.visitAndwait('/login')
  })

  it('Deveria ser possivel visualizar os elementos da tela', () => {
    cy.get('[data-testid="form"]').should('be.visible')
    cy.get('[data-testid="logo"]').should('be.visible')
    cy.get('[data-testid="input-email"]').should('be.visible')
    cy.get('[data-testid="input-password"]').should('be.visible')
    cy.get('[data-testid="btn-login"]').should('be.visible').and('be.disabled')
  })
})