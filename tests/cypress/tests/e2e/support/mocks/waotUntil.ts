/**
 * Aguarda até que o documento esteja completamente carregado.
 *
 * @param timeout Tempo máximo (em milissegundos) para aguardar que os elementos sejam carregados.
 * @param intervalo Intervalo (em milissegundos) entre as verificações.
 * @returns Uma Promise que é resolvida quando os elementos são carregados ou rejeitada caso o timeout seja atingido.
 */
export function waitUntilDocumentLoaded(
  timeout: number = Cypress.config('defaultCommandTimeout'),
  intervalo: number = 100
): Promise<void> {
  return new Cypress.Promise((resolve, reject) => {
    const inicio = Date.now();

    const verificar = () => {
      const doc = window.document;

      if (doc.readyState === 'complete' && doc.body && doc.body.childElementCount > 0) {
        return resolve();
      }

      if (Date.now() - inicio > timeout) {
        return reject(
          new Error(`Timeout de ${timeout}ms atingido. Document não foi carregado completamente.`)
        );
      }

      return setTimeout(verificar, intervalo);
    };

    verificar();
  });
}

/**
 * Aguarda até que um elemento seja visível na página.
 *
 * @param element O elemento a ser verificado.
 * @param timeout Tempo máximo (em milissegundos) para aguardar que o elemento seja visível.
 * @param intervalo Intervalo (em milissegundos) entre as verificações.
 * @returns Uma Promise que é resolvida quando o elemento é visível ou rejeitada caso o timeout seja atingido.
 */
export function waitUntilElementVisible(
  element: Cypress.Chainable,
  timeout: number = Cypress.config('defaultCommandTimeout'),
  intervalo: number = 100
): Promise<void> {
  return new Cypress.Promise((resolve, reject) => {
    const inicio = Date.now();

    const verificar = () => {
      element.then($el => {
        if ($el.is(':visible')) {
          resolve();
          return;
        }

        if (Date.now() - inicio > timeout) {
          reject(new Error(`Timeout de ${timeout}ms atingido. Elemento não foi visível.`));
          return;
        }

        setTimeout(verificar, intervalo);
      });
    };

    verificar();
  });
}

/**
 * Aguarda até que um elemento atinja um determinado estado.
 *
 * @param element O elemento a ser verificado
 * @param state Estado desejado ('visible', 'hidden', 'enabled', 'disabled', 'attached', 'detached')
 * @param timeout Tempo máximo (em milissegundos) para aguardar
 * @param intervalo Intervalo (em milissegundos) entre as verificações
 * @returns Uma Promise que é resolvida quando o elemento atinge o estado desejado
 */
export function waitUntilElementState(
  element: Cypress.Chainable,
  state: 'visible' | 'hidden' | 'enabled' | 'disabled' | 'attached' | 'detached',
  timeout: number = Cypress.config('defaultCommandTimeout'),
  intervalo: number = 100
): Promise<void> {
  return new Cypress.Promise((resolve, reject) => {
    const inicio = Date.now();

    const verificar = () => {
      const stateMap = {
        visible: 'be.visible',
        hidden: 'not.be.visible',
        enabled: 'be.enabled',
        disabled: 'be.disabled',
        attached: 'exist',
        detached: 'not.exist'
      };

      element.should(stateMap[state]).then(() => resolve());

      if (Date.now() - inicio > timeout) {
        return reject(
          new Error(`Timeout de ${timeout}ms atingido. Elemento não atingiu o estado "${state}".`)
        );
      }
      return setTimeout(verificar, intervalo);
    };

    verificar();
  });
}