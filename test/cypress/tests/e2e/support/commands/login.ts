/// <reference types="cypress" />

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}login`,
      headers: {},
      body: {
        email: email,
        password: password,
      },
    }).then((response) => {
      const { token } = response.body;

      window.localStorage.setItem('user-email', email);
      window.localStorage.setItem('user-token', token);
    });
  }, { cacheAcrossSpecs: true });
});
