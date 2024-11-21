import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const toastOptions = {
  position: 'top-right',
  hideProgressBar: false,
  autoClose: 4000,
  draggable: true,
  limit: 2,
} as ToastContainerOptions

export { toastOptions, Vue3Toastify }

