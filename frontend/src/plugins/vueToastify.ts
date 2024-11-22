import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastOptions = {
  theme: "auto",
  type: "default",
  position: 'top-right',
  closeButton: false,
  hideProgressBar: true,
  autoClose: 4000,
  draggable: true,
  limit: 2,
  style: {
    opacity: '1',
    userSelect: 'initial',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '300px',
  },
} as ToastContainerOptions;


export { toastOptions, Vue3Toastify };

