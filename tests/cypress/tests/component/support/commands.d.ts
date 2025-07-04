/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to mount a component with Vue plugins
     * @example cy.mount(MyComponent, { props: { title: 'Test' } })
     */
    mount(component: any, options?: {
      props?: Record<string, any>
      global?: {
        plugins?: any[]
        components?: Record<string, any>
        stubs?: Record<string, any>
      }
      slots?: Record<string, any>
    }): Chainable<any>
    /**
     * Custom command to check if component is visible
     * @example cy.checkComponentVisibility('[data-testid="my-component"]')
     */
    checkComponentVisibility(selector: string): Chainable<any>

    /**
     * Custom command to simulate user interaction with component
     * @example cy.interactWithComponent('[data-testid="button"]', 'click')
     */
    interactWithComponent(selector: string, action: 'click' | 'hover' | 'focus' | 'blur'): Chainable<any>

    /**
     * Custom command to check component props
     * @example cy.checkComponentProps('[data-testid="my-component"]', { title: 'Expected Title' })
     */
    checkComponentProps(selector: string, expectedProps: Record<string, any>): Chainable<any>
  }
}