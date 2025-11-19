import ProfileTemplate from 'frontend/src/modules/user/components/profile/ProfileTemplate.vue';
import { mockGetMe } from '../support/mocks/getMe';
import { mockPatchMe } from '../support/mocks/patchMe';

describe('Componente de perfil de usuário', () => {
  beforeEach(() => {
    mockGetMe();
    mockPatchMe();
  });

  it('Deveria exibir o componente de perfil de usuário', () => {
    cy.mount(ProfileTemplate);
    cy.get('[data-testid="profile-page"]').should('be.visible');
  });

  it('Deveria exibir as informações do usuário corretamente', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    cy.get('[data-testid="input-fullname-profile"]').should('have.value', 'Teste Usuário');
    cy.get('[data-testid="input-socialname-profile"]').should('have.value', 'Teste Usuário');
    cy.get('[data-testid="input-phone-profile"]').should('have.value', '11999999999');
    cy.get('[data-testid="input-cpfcnpj-profile"]').should('have.value', '11122233344');
  });

  it('Deveria ter o campo CPF/CNPJ desabilitado', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    cy.get('[data-testid="input-cpfcnpj-profile"]').should('be.disabled');
  });

  it('Deveria exibir mensagens de erro quando campos obrigatórios estão vazios', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    cy.get('[data-testid="input-fullname-profile"]').clear().blur();
    cy.get('[data-testid="input-phone-profile"]').clear().blur();
    cy.get('[data-testid="input-error-fulname-profile"]').should('be.visible');
    cy.get('[data-testid="input-error-fulname-profile"]').should('have.text', 'O Nome Completo é obrigatório.');
    cy.get('[data-testid="input-error-phone-profile"]').should('be.visible').and('have.text', 'O Telefone é obrigatório.');
  });

  it('Deveria exibir mensagem de erro quando o telefone for inválido', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    cy.get('[data-testid="input-phone-profile"]').clear().type('123a').blur();
    cy.get('[data-testid="input-error-phone-profile"]').should('be.visible').and('have.text', 'O telefone deve conter apenas números.');
  });

  it('Deveria exibir mensagem de erro quando o telefone tiver menos de 10 dígitos', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    cy.get('[data-testid="input-phone-profile"]').clear().type('123456789').blur();
    cy.get('[data-testid="input-error-phone-profile"]').should('be.visible').and('have.text', 'O telefone deve ter no mínimo 10 dígitos.');
  });

  it('Deveria exibir mensagem de erro quando o telefone tiver mais de 11 dígitos', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    cy.get('[data-testid="input-phone-profile"]').clear().type('123456789012').blur();
    cy.get('[data-testid="input-error-phone-profile"]').should('be.visible').and('have.text', 'O telefone deve ter no máximo 11 dígitos.');
  });

  it('Deveria exibir todos os labels corretamente', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    cy.contains('label', 'Nome Completo').should('be.visible');
    cy.contains('label', 'Nome Social').should('be.visible');
    cy.contains('label', 'Telefone').should('be.visible');
    cy.contains('label', 'CPF ou CNPJ').should('be.visible');
  });

  it('Deveria exibir placeholders corretos nos campos', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    cy.get('[data-testid="input-fullname-profile"]').should('have.attr', 'placeholder', 'Digite seu nome completo');
    cy.get('[data-testid="input-socialname-profile"]').should('have.attr', 'placeholder', 'Digite seu nome social (opcional)');
    cy.get('[data-testid="input-phone-profile"]').should('have.attr', 'placeholder', '(00) 00000-0000');
    cy.get('[data-testid="input-cpfcnpj-profile"]').should('have.attr', 'placeholder', 'Digite seu CPF ou CNPJ');
  });
});