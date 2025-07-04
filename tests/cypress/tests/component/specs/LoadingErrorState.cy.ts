import LoadingErrorState from 'frontend/src/components/LoadingErrorState.vue';

describe('LoadingErrorState Component', () => {
  it('Deveria exibir o estado de carregamento quando isLoading for true', () => {
    cy.mount(LoadingErrorState, {
      props: {
        isLoading: true,
        isError: false
      }
    });

    cy.get('.loading-container').should('be.visible');
    cy.contains('Carregando...').should('be.visible');
    cy.get('.spinner').should('be.visible');
    cy.get('.error-container').should('not.exist');
  });

  it('Deveria exibir o estado de erro quando isError for true', () => {
    cy.mount(LoadingErrorState, {
      props: {
        isLoading: false,
        isError: true
      }
    });

    cy.get('.error-container').should('be.visible');
    cy.contains('Erro ao carregar os dados do usuário.').should('be.visible');
    cy.get('.loading-container').should('not.exist');
  });

  it('Deveria exibir nada quando ambos isLoading e isError forem false', () => {
    cy.mount(LoadingErrorState, {
      props: {
        isLoading: false,
        isError: false
      }
    });

    cy.get('.loading-container').should('not.exist');
    cy.get('.error-container').should('not.exist');
  });

  it('Deveria priorizar o carregamento sobre o erro quando ambos forem true', () => {
    cy.mount(LoadingErrorState, {
      props: {
        isLoading: true,
        isError: true
      }
    });

    cy.get('.loading-container').should('be.visible');
    cy.get('.error-container').should('not.exist');
  });

  it('Deveria ter o estilo correto para o estado de carregamento', () => {
    cy.mount(LoadingErrorState, {
      props: {
        isLoading: true,
        isError: false
      }
    });

    cy.get('.loading-container').should('have.css', 'display', 'flex');
    cy.get('.loading-container').should('have.css', 'justify-content', 'center');
    cy.get('.loading-container').should('have.css', 'align-items', 'center');
    cy.get('.loading-container').should('have.css', 'text-align', 'center');
    cy.get('.loading-container').should('have.css', 'min-height', '200px');
  });

  it('Deveria ter o estilo correto para o estado de erro', () => {
    cy.mount(LoadingErrorState, {
      props: {
        isLoading: false,
        isError: true
      }
    });

    cy.get('.error-container').should('have.css', 'display', 'flex');
    cy.get('.error-container').should('have.css', 'justify-content', 'center');
    cy.get('.error-container').should('have.css', 'align-items', 'center');
    cy.get('.error-container').should('have.css', 'text-align', 'center');
    cy.get('.error-container').should('have.css', 'min-height', '200px');
    cy.get('.error-container').should('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('Deveria ter o spinner animado', () => {
    cy.mount(LoadingErrorState, {
      props: {
        isLoading: true,
        isError: false
      }
    });

    cy.get('.spinner').should('have.css', 'animation').and('include', 'spin');
    cy.get('.spinner').should('have.css', 'animation-duration', '1s');
    cy.get('.spinner').should('have.css', 'animation-timing-function', 'linear');
    cy.get('.spinner').should('have.css', 'animation-iteration-count', 'infinite');
  });

  it('Deveria ter as dimensões e o estilo corretos para o spinner', () => {
    cy.mount(LoadingErrorState, {
      props: {
        isLoading: true,
        isError: false
      }
    });

    cy.get('.spinner').should('have.css', 'width', '40px');
    cy.get('.spinner').should('have.css', 'height', '40px');
    cy.get('.spinner').should('have.css', 'border-radius', '50%');
    cy.get('.spinner').should('have.css', 'margin-top', '0px');
  });
}); 