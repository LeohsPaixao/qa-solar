import { fillUserForm } from '@/shared/fillUserForm';

describe('Tela de Cadastro de Usuário', () => {
  beforeEach(() => {
    cy.visitAndwait('/signup');
  });

  it('Deveria ser possivel visualizar os elementos da tela de cadastro', () => {
    cy.get('[data-testid="form-register"]').should('be.visible');
    cy.get('.form-group').should('be.visible');
    cy.get('[data-testid="btn-register"]').should('be.visible');
    cy.get('[data-testid="link-go-to-login"]').should('be.visible');
  });

  it('Deveria ser possivel visualizar o toast ao clicar no botão sem adicionar algum valor nos campos', () => {
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Por favor, corrija os erros no formulário.');

    const inputName = ['fullname', 'cpfcnpj', 'email', 'password'];
    const inputError = ['O Nome Completo é obrigatório.', 'O CPF/CNPJ é obrigatório.', 'O Email é obrigatório.', 'A Senha é obrigatória.'];

    inputName.forEach((name, index) => {
      cy.get(`[data-testid="input-error-${name}"]`).should('have.text', inputError[index]);
    });
  });

  it('Não deveria ser possivel criar o usuário com o Nome Completo errado', () => {
    fillUserForm();
    cy.get('[data-testid="input-fullname"]').type('{selectall}Teste');
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Por favor, corrija os erros no formulário.');
    cy.get('[data-testid="input-error-fullname"]').should('be.visible').and('have.text', 'O Nome Completo deve conter pelo menos Nome e Sobrenome.');
  });

  it('Não deveria ser possivel criar o usuário com o CPF inválido', () => {
    fillUserForm();
    cy.get('[data-testid="input-document"]').type('{selectall}123.456.789-10');
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Por favor, corrija os erros no formulário.');
    cy.get('[data-testid="input-error-cpfcnpj"]').should('be.visible').and('have.text', 'CPF inválido.');
  });

  it('Não deveria ser possivel criar o usuário com o CNPJ inválido', () => {
    fillUserForm();
    cy.get('[data-testid="select-document-type"]').select('cnpj');
    cy.get('[data-testid="input-document"]').type('{selectall}12.456.789/1110-60');
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Por favor, corrija os erros no formulário.');
    cy.get('[data-testid="input-error-cpfcnpj"]').should('be.visible').and('have.text', 'CNPJ inválido.');
  });

  it('Não deveria ser possivel colocar letras no campo de telefone', () => {
    fillUserForm();
    cy.get('[data-testid="input-phone"]').type('{selectall}sdadfafsa');
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Por favor, corrija os erros no formulário.');
    cy.get('[data-testid="input-error-phone"]').should('be.visible').and('have.text', 'O telefone deve conter apenas números.');
  });

  it('Não deveria ser possivel colocar mais do que 11 dígitos no campo de telefone', () => {
    fillUserForm();
    cy.get('[data-testid="input-phone"]').type('{selectall}154542165455454');
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Por favor, corrija os erros no formulário.');
    cy.get('[data-testid="input-error-phone"]').should('be.visible').and('have.text', 'O telefone deve ter no máximo 11 dígitos.');
  });

  it('Não deveria ser possivel colocar menos do que 10 dígitos no campo de telefone', () => {
    fillUserForm();
    cy.get('[data-testid="input-phone"]').type('{selectall}123');
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Por favor, corrija os erros no formulário.');
    cy.get('[data-testid="input-error-phone"]').should('be.visible').and('have.text', 'O telefone deve ter no mínimo 10 dígitos.');
  });

  it('Não deveria ser possivel criar o usuário com o email inválido', () => {
    fillUserForm();
    cy.get('[data-testid="input-email"]').type('{selectall}email@email');
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Por favor, corrija os erros no formulário.');
    cy.get('[data-testid="input-error-email"]').should('be.visible').and('have.text', 'Email inválido.');
  });

  it('Não deveria ser possivel cadastrar o usuário com uma senha com menos de 6 caracteres', () => {
    fillUserForm();
    cy.get('[data-testid="input-password"]').type('{selectall}12345');
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Por favor, corrija os erros no formulário.');
    cy.get('[data-testid="input-error-password"]').should('be.visible').and('have.text', 'A Senha deve ter no mínimo 6 caracteres.');
  });

  it('Não deveria ser possivel cadastrar o usuário com uma senha com mais de 20 caracteres', () => {
    fillUserForm();
    cy.get('[data-testid="input-password"]').type('{selectall}1234567891012141516131');
    cy.get('[data-testid="btn-register"]').should('be.enabled').click();
    cy.get('[data-testid="toast-content"]').should('have.text', 'Por favor, corrija os erros no formulário.');
    cy.get('[data-testid="input-error-password"]').should('be.visible').and('have.text', 'A Senha deve ter no máximo 20 caracteres.');
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
