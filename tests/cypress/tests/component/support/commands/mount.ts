import { VueQueryPlugin } from '@tanstack/vue-query';
import { mount } from 'cypress/vue';
import { queryClient } from 'frontend/src/plugins/vueQuery';
import { Vue3Toastify, toastOptions } from 'frontend/src/plugins/vueToastify';

Cypress.Commands.add('mount', (component, options = {}) => {
  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];

  options.global.plugins.push([VueQueryPlugin, { queryClient }]);
  options.global.plugins.push([Vue3Toastify, toastOptions]);

  return mount(component, options);
});