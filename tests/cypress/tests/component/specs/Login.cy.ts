import LoginTemplate from 'frontend/src/modules/auth/components/login/LoginTemplate.vue';

describe('Componente de login', () => {
  it('Deveria exibir o componente de login', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="form-login"]').should('be.visible');
  });

  it('Deveria exibir todas as informações do componente de login', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="logo"]').should('be.visible');
    cy.get('h2').should('be.visible').and('have.text', 'Bem-vindo de volta!');
    cy.get('p:eq(0)').should('be.visible').and('have.text', 'Por favor, entre com suas credenciais abaixo:');
    cy.get('[data-testid="label-email"]').should('be.visible').and('have.text', 'Insira seu E-mail');
    cy.get('[data-testid="label-password"]').should('be.visible').and('have.text', 'Insira sua Senha');
    cy.get('[data-testid="input-email"]').should('be.visible');
    cy.get('[data-testid="input-password"]').should('be.visible');
    cy.get('[data-testid="btn-login"]').should('be.visible').and('have.text', 'Entrar na Conta');
    cy.get('[data-testid="link-recover-password"]').should('be.visible').invoke('text').then((text) => {
      expect(text.trim()).to.equal('Esqueceu a senha?');
    });
    cy.get('[data-testid="link-signup"]').should('be.visible').invoke('text').then((text) => {
      expect(text.trim()).to.equal('Criar uma nova conta');
    });
    cy.get('p.message-user-login').should('be.visible').invoke('text').then((text) => {
      expect(text.trim()).to.include('generic@example.com');
      expect(text).to.include('123456');
    });
  });

  it('Deveria exibir mensagem de erro quando o email estiver vazio', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="input-email"]').type('asd@asd.com').clear().blur();
    cy.get('[data-testid="message-error-email"]').should('be.visible').and('have.text', 'O Email é obrigatório.');
  });

  it('Deveria exibir mensagem de erro quando a senha estiver vazia', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="input-password"]').type('1').clear().blur();
    cy.get('[data-testid="message-error-password"]').should('be.visible').and('have.text', 'A Senha é obrigatória.');
  });

  it('Deveria exibir mensagem de erro quando o email for inválido', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="input-email"]').type('invalid-email').blur();
    cy.get('[data-testid="message-error-email"]').should('be.visible').and('have.text', 'Email inválido.');
  });

  it('Deveria renderizar o link de recuperação de senha com o href correto', () => {
    cy.mount(LoginTemplate);

    cy.get('[data-testid="link-recover-password"]')
      .should('have.attr', 'href', '/recover-password')
      .and('contain', 'Esqueceu a senha?');
  });

  it('Deveria renderizar o link de cadastro com o href correto', () => {
    cy.mount(LoginTemplate);

    cy.get('[data-testid="link-signup"]')
      .should('have.attr', 'href', '/signup')
      .and('contain', 'Criar uma nova conta');
  });
});