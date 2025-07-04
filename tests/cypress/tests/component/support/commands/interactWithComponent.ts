/// <reference types="cypress" />

Cypress.Commands.add('interactWithComponent', (selector, action) => {
  const element = cy.get(selector);

  switch (action) {
    case 'click':
      return element.click();
    case 'hover':
      return element.trigger('mouseover');
    case 'focus':
      return element.focus();
    case 'blur':
      return element.blur();
    default:
      return element;
  }
});