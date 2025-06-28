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

  it('Deveria exibir o botão desabilitado quando os campos estão vazios', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="btn-login"]').should('be.disabled');
  });

  it('Deveria exibir mensagem de erro quando o e-mail é inválido ao sair do campo', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="input-email"]').type('invalid-email');
    cy.get('[data-testid="input-email"]').blur();
    cy.get('[data-testid="message-error-email"]').should('be.visible').and('have.text', 'Por favor, insira um email válido.');
  });

  it('Deveria exibir mensagem de erro quando a senha é inválida ao sair do campo', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="input-password"]').type('123');
    cy.get('[data-testid="input-password"]').blur();
    cy.get('[data-testid="message-error-password"]').should('be.visible').and('have.text', 'A senha deve ter pelo menos 6 caracteres.');
  });

  it('Deveria limpar mensagem de erro do e-mail quando o usuário começa a digitar novamente', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="input-email"]').type('invalid-email');
    cy.get('[data-testid="input-email"]').blur();
    cy.get('[data-testid="message-error-email"]').should('be.visible');
    cy.get('[data-testid="input-email"]').clear().type('valid@email.com');
    cy.get('[data-testid="message-error-email"]').should('not.exist');
  });

  it('Deveria limpar mensagem de erro da senha quando o usuário começa a digitar novamente', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="input-password"]').type('123');
    cy.get('[data-testid="input-password"]').blur();
    cy.get('[data-testid="message-error-password"]').should('be.visible');
    cy.get('[data-testid="input-password"]').clear().type('123456');
    cy.get('[data-testid="message-error-password"]').should('not.exist');
  });

  it('Deveria habilitar o botão apenas quando ambos os campos são válidos', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="btn-login"]').should('be.disabled');

    cy.get('[data-testid="input-email"]').type('valid@email.com');
    cy.get('[data-testid="btn-login"]').should('be.disabled');

    cy.get('[data-testid="input-password"]').type('123456');
    cy.get('[data-testid="btn-login"]').should('not.be.disabled');
  });

  it('Deveria desabilitar o botão quando há erros de validação', () => {
    cy.mount(LoginTemplate);
    cy.get('[data-testid="input-email"]').type('valid@email.com');
    cy.get('[data-testid="input-password"]').type('123456');
    cy.get('[data-testid="btn-login"]').should('not.be.disabled');

    cy.get('[data-testid="input-email"]').clear().type('invalid-email');
    cy.get('[data-testid="input-email"]').blur();
    cy.get('[data-testid="btn-login"]').should('be.disabled');
  });
});