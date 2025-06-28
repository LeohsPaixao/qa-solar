/// <reference types="cypress" />

Cypress.Commands.add('checkComponentProps', (selector, expectedProps) => {
  return cy.get(selector).then(($el) => {
    // This is a basic implementation - you might need to adapt based on how props are exposed
    Object.entries(expectedProps).forEach(([key, value]) => {
      // Check for data attributes that might represent props
      cy.get(selector).should('have.attr', `data-${key}`, value);
    });
  });
});