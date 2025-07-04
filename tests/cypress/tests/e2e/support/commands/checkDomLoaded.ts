/// <reference types="cypress" />

Cypress.Commands.add('checkDomLoaded', (selectorToCheck?: string) => {
  cy.window().then((win) => {
    const isDomComplete = () => win.document.readyState === 'complete';

    if (!isDomComplete()) {
      const loadEvent = new Event('load');
      win.dispatchEvent(loadEvent);
    }

    cy.wrap(win).should((win) => {
      expect(win.document.readyState).to.equal('complete');
    });

    if (selectorToCheck) {
      cy.get(selectorToCheck, { timeout: 10000 }).should('be.visible');
    }
  });
});
