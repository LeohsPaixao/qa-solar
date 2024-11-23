/// <reference types="cypress" />

Cypress.Commands.add('waitForAnimation', (time: number) => {
  cy.wait(time);
});
