import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import LoadingErrorState from './LoadingErrorState.vue';

describe('LoadingErrorState', () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('Estado de Carregamento', () => {
    it('Deveria renderizar o estado de carregamento quando isLoading for true', () => {
      wrapper = mount(LoadingErrorState, {
        props: {
          isLoading: true,
          isError: false,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('[data-testid="loading-container"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="loading-message"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="spinner"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="error-container"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="error-message"]').exists()).toBe(false);
    });

    it('Deveria exibir a mensagem de carregamento correta', () => {
      wrapper = mount(LoadingErrorState, {
        props: {
          isLoading: true,
          isError: false,
        },
      });

      expect(wrapper.find('[data-testid="loading-message"]').text()).toBe('Carregando...');
    });
  });

  describe('Estado de Erro', () => {
    it('Deveria renderizar o estado de erro quando isError for true', () => {
      wrapper = mount(LoadingErrorState, {
        props: {
          isLoading: false,
          isError: true,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('[data-testid="error-container"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="error-message"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="loading-container"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="loading-message"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="spinner"]').exists()).toBe(false);
    });

    it('Deveria exibir a mensagem de erro padrão', () => {
      wrapper = mount(LoadingErrorState, {
        props: {
          isLoading: false,
          isError: true,
        },
      });

      expect(wrapper.find('[data-testid="error-message"]').text()).toBe('Erro ao carregar os dados do usuário.');
    });

    it('Deveria exibir mensagem de erro customizada', () => {
      const customMessage = 'Erro personalizado';
      wrapper = mount(LoadingErrorState, {
        props: {
          isLoading: false,
          isError: true,
          errorMessage: customMessage,
        },
      });

      expect(wrapper.find('[data-testid="error-message"]').text()).toBe(customMessage);
    });
  });

  describe('Estado Inativo', () => {
    it('Deveria não renderizar nada quando ambos isLoading e isError forem false', () => {
      wrapper = mount(LoadingErrorState, {
        props: {
          isLoading: false,
          isError: false,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('[data-testid="loading-container"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="error-container"]').exists()).toBe(false);
    });
  });

  describe('Priorização de Estados', () => {
    it('Deveria priorizar o carregamento sobre o erro quando ambos forem true', () => {
      wrapper = mount(LoadingErrorState, {
        props: {
          isLoading: true,
          isError: true,
        },
      });

      expect(wrapper.find('[data-testid="loading-container"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="error-container"]').exists()).toBe(false);
    });
  });
});
