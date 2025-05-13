/// <reference types="cypress" />

Cypress.Commands.add('visitAndwait', (url: string) => {
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: 'http://localhost:3001',
    alias: 'calls',
    log: false,
  });

  cy.visit(url);

  cy.waitForNetworkIdle('@calls', 1000);

  cy.checkDomLoaded('body');
});
