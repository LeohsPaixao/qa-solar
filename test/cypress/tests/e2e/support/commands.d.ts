/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Comando customizado do Cypress para visitar uma URL e aguardar a conclusão de uma requisição de rede.
     *
     * Esta função utiliza `cy.waitForNetworkIdlePrepare` para preparar a espera pela inatividade da rede,
     * `cy.visit` para navegar para a URL especificada, e `cy.waitReq` para aguardar uma requisição de rede específica.
     *
     * @param url - A URL a ser visitada.
     *
     * @throws Lança um erro se a requisição de rede não for concluída dentro do tempo limite especificado.
     *
     * @example
     * cy.visitAndWait('https://exemplo.com');
     */
    visitAndwait(url: string): Chainable<JQuery<HTMLElement>>;
    /**
     * Um comando personalizado do Cypress para aguardar a duração de uma animação especificada.
     *
     *
     * @remarks
     * Este comando é útil para cenários de teste onde é necessário aguardar a conclusão de uma animação antes de prosseguir com ações adicionais.
     *
     * @param time - A duração da animação em milissegundos, representada como uma string.
     *
     * @returns {void} - A função não retorna nenhum valor.
     *
     * @example
     * ```typescript
     * cy.waitForAnimation(1000); // Aguarda 1 segundo
     * ```
     */
    waitForAnimation(time: number): Chainable<JQuery<HTMLElement>>;
    /**
     * Comando customizado do Cypress para verificar se o DOM está completamente carregado e se um elemento específico está visível.
     *
     *
     * @remarks
     * Este comando é útil para garantir que o DOM esteja completamente carregado antes de interagir com os elementos.
     * Ele dispara um evento 'load' caso o DOM ainda não esteja completo, aguarda as requisições de rede,
     * e verifica se o elemento especificado está visível dentro de um tempo limite definido.
     *
     * @param selectorToCheck - O seletor CSS do elemento que será verificado quanto à visibilidade.
     *                          O valor padrão é 'body' se não for fornecido.
     *
     * @returns {void} - A função não retorna nenhum valor.
     *
     * @example
     * ```typescript
     * // Use o comando customizado para verificar se o DOM está carregado e o elemento 'h1' está visível
     * cy.checkDomLoaded('h1');
     * ```
     */
    checkDomLoaded(selectorToCheck?: string): Chainable<JQuery<HTMLElement>>;
  }
}
