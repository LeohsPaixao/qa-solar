import type { App } from 'vue'

import router from '../router'
import { Vue3Toastify, toastOptions } from './vueToastify'

export function registerPlugins(app: App) {
  app
    .use(router)
    .use(Vue3Toastify, toastOptions)
}
