import type { App } from 'vue'

import router from '../router'
import { VueQueryPlugin, vueQueryOptions } from './vueQuery'
import { Vue3Toastify, toastOptions } from './vueToastify'

/**
 * Registra plugins essenciais na aplicação Vue.
 *
 * @param app - A instância da aplicação Vue onde os plugins serão registrados.
 *
 * @returns {void}
 *
 * @remarks
 * Esta função é responsável por adicionar plugins essenciais à aplicação Vue,
 * como o router, VueQuery e VueToastify. Os parâmetros fornecidos são utilizados
 * para configurar cada plugin de acordo.
 *
 * @example
 * ```typescript
 * import { createApp } from 'vue'
 * import App from './App.vue'
 * import { registerPlugins } from './plugins'
 *
 * const app = createApp(App)
 * registerPlugins(app)
 * app.mount('#app')
 * ```
 */
export function registerPlugins(app: App) {
  app.use(router).use(Vue3Toastify, toastOptions).use(VueQueryPlugin, vueQueryOptions)
}
