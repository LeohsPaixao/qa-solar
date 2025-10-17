import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import AppHome from './AppHome.vue';

describe('AppHome', () => {
  let wrapper: any;

  beforeEach(() => (wrapper = mount(AppHome)));

  afterEach(() => wrapper.unmount());

  describe('Renderização', () => {
    it('Deveria renderizar o componente corretamente', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.main-container').exists()).toBe(true);
    });

    it('Deveria exibir o logo da aplicação', () => {
      expect(wrapper.find('.logo').exists()).toBe(true);
      expect(wrapper.find('.logo').attributes('src')).toBe('/src/assets/images/logoqae2e.jpg');
      expect(wrapper.find('.logo').attributes('alt')).toBe('Logo QA E2E');
    });

    it('Deveria exibir a descrição do projeto', () => {
      expect(wrapper.find('.project-description').exists()).toBe(true);
      expect(wrapper.find('.project-description').text()).toBe(
        'Este projeto é Open Source e visa servir para fins de UI Tests, utilizando diversos frameworks de testes. Ele pode servir como um "Hello World" para os frameworks de testes. Atualmente, foi pensado utilizar Cypress, Playwright e Robot Framework, mas futuramente esta lista pode aumentar.',
      );
    });
  });

  describe('Estrutura HTML', () => {
    it('Deveria ter a estrutura correta do componente', () => {
      expect(wrapper.find('.main-container').exists()).toBe(true);
      expect(wrapper.find('.logo-container').exists()).toBe(true);
      expect(wrapper.find('.logo').exists()).toBe(true);
      expect(wrapper.find('.project-description').exists()).toBe(true);
    });
  });
});
