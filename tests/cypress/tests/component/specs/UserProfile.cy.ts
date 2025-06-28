import ProfileTemplate from 'frontend/src/modules/user/components/profile/ProfileTemplate.vue';

describe('Componente de perfil de usuário', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        id: 1,
        full_name: 'Teste Usuário',
        social_name: 'Teste Usuário',
        email: 'teste@example.com',
        phone: '11999999999',
        document: '11122233344',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    }).as('fetchUser');

    cy.intercept('PATCH', '**/users/me', {
      statusCode: 200,
      delay: 1000,
      body: {
        message: 'Perfil atualizado com sucesso!',
        user: {
          id: 1,
          full_name: 'Teste Usuário',
          social_name: 'Teste Usuário',
          email: 'teste@example.com',
          phone: '11999999999',
          document: '11122233344',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      }
    }).as('updateUser');
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

  it('Deveria mostrar o botão de salvar desabilitado quando não há mudanças', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    cy.get('[data-testid="btn-save-profile"]').should('be.disabled');
  });

  it('Deveria habilitar o botão de salvar quando há mudanças nos campos editáveis', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    // Inicialmente desabilitado
    cy.get('[data-testid="btn-save-profile"]').should('be.disabled');

    // Alterar nome completo
    cy.get('[data-testid="input-fullname-profile"]').clear().type('Novo Nome');
    cy.get('[data-testid="btn-save-profile"]').should('not.be.disabled');

    // Voltar ao valor original
    cy.get('[data-testid="input-fullname-profile"]').clear().type('Teste Usuário');
    cy.get('[data-testid="btn-save-profile"]').should('be.disabled');
  });

  it('Deveria exibir mensagens de erro quando campos obrigatórios estão vazios', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    // Limpar campo obrigatório e tentar salvar
    cy.get('[data-testid="input-fullname-profile"]').clear();
    cy.get('[data-testid="btn-save-profile"]').click();

    // Verificar se a mensagem de erro aparece
    cy.get('[data-testid="input-error-fulname-profile"]').should('be.visible');
    cy.get('[data-testid="input-fullname-profile"]').should('have.class', 'input-error');
  });

  it('Deveria exibir mensagem de erro para telefone inválido', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    // Inserir telefone inválido
    cy.get('[data-testid="input-phone-profile"]').clear().type('123');
    cy.get('[data-testid="btn-save-profile"]').click();

    // Verificar se a mensagem de erro aparece
    cy.get('[data-testid="input-error-phone-profile"]').should('be.visible');
    cy.get('[data-testid="input-phone-profile"]').should('have.class', 'input-error');
  });

  it('Deveria mostrar "Salvando..." no botão durante o processo de atualização', () => {
    cy.fixture('userData.json').then((userData) => {
      cy.mount(ProfileTemplate, {
        props: {
          user: userData
        }
      });
    });

    // Fazer uma mudança válida
    cy.get('[data-testid="input-fullname-profile"]').clear().type('Novo Nome Válido');
    cy.get('[data-testid="btn-save-profile"]').click();

    // Verificar se o texto muda para "Salvando..."
    cy.get('[data-testid="btn-save-profile"]').should('contain.text', 'Salvando...');
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