import 'frontend/src/assets/styles/main.css';
import 'frontend/src/assets/styles/toast.css';
import 'frontend/src/plugins/index.ts';
import './commands';

beforeEach(() => {
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  console.warn('Uncaught exception:', err.message);
  return false;
}); 