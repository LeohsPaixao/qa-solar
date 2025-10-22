import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockToast } from '../../test/mocks/mockToast';
import { mockUseRouter } from '../../test/mocks/mockUseRouter';
import AppHeader from './AppHeader.vue';

import { useLogout } from '@/composables/useLogoutUser';
import { LogoutResponse } from '@/types/user.types';
import { useMutation } from '@tanstack/vue-query';

describe('AppHeader', () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    vi.clearAllMocks();
  });

  describe('Renderização', () => {
    it('Deveria renderizar o componente corretamente', () => {
      wrapper = mount(AppHeader);

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('[data-testid="app-header"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="nav-menu"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="user-dropdown"]').exists()).toBe(true);
    });

    it('Deveria renderizar os links de navegação', () => {
      wrapper = mount(AppHeader);

      expect(wrapper.find('[data-testid="link-home"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="link-table-users"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="link-home"]').text()).toBe('Home');
      expect(wrapper.find('[data-testid="link-table-users"]').text()).toBe('Table Users');
    });

    it('Deveria renderizar o avatar e nome do usuário', () => {
      wrapper = mount(AppHeader);

      expect(wrapper.find('[data-testid="user-avatar"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="user-name"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="user-name"]').text()).toBe('Usuário');
    });
  });

  describe('Dropdown do Usuário', () => {
    it('Deveria abrir o dropdown quando clicado', async () => {
      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      expect(wrapper.find('[data-testid="dropdown-profile"]').exists()).toBe(false);

      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-testid="dropdown-profile"]').exists()).toBe(true);
    });

    it('Deveria fechar o dropdown quando clicado novamente', async () => {
      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');

      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-testid="dropdown-profile"]').exists()).toBe(true);

      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-testid="dropdown-profile"]').exists()).toBe(false);
    });

    it('Deveria exibir as opções do dropdown', async () => {
      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-testid="dropdown-profile-update"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="dropdown-profile-logout"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="dropdown-profile-update"]').text()).toBe('Perfil');
      expect(wrapper.find('[data-testid="dropdown-profile-logout"]').text()).toBe('Sair');
    });
  });

  describe('Navegação', () => {
    it('Deveria navegar para o perfil quando clicado', async () => {
      const mockPush = vi.fn();
      mockUseRouter.mockReturnValue({
        push: mockPush,
        replace: vi.fn(),
        go: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        currentRoute: {
          value: { path: '/', name: 'home', params: {}, query: {} },
        },
      });

      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();

      const profileOption = wrapper.find('[data-testid="dropdown-profile-update"]');
      await profileOption.trigger('click');

      expect(mockPush).toHaveBeenCalledWith('/profile');
    });

    it('Deveria executar logout quando clicado', async () => {
      const mockResponse: LogoutResponse = {
        message: 'O usuário foi deslogado com sucesso!',
      };

      const mockMutation = {
        data: { value: mockResponse },
        error: { value: null },
        isLoading: { value: false },
        isError: { value: false },
        isSuccess: { value: true },
        isPending: { value: false },
        mutate: vi.fn(),
        mutateAsync: vi.fn(),
        reset: vi.fn(),
      };

      vi.mocked(useMutation).mockReturnValueOnce(mockMutation as any);

      const result = useLogout();

      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();

      const logoutOption = wrapper.find('[data-testid="dropdown-profile-logout"]');
      await logoutOption.trigger('click');

      expect(result.isSuccess.value).toBe(true);
      expect(result.data.value).toStrictEqual(mockResponse);
    });
  });

  describe('Props do Usuário', () => {
    it('Deveria usar o usuário passado como prop quando fornecido', () => {
      const customUser = {
        id: 2,
        full_name: 'Usuário Customizado',
        email: 'custom@exemplo.com',
      };

      wrapper = mount(AppHeader, {
        props: {
          user: customUser,
        },
      });

      expect(wrapper.find('[data-testid="user-name"]').text()).toBe('Usuário Customizado');
    });

    it('Deveria usar o usuário padrão quando nenhuma prop for fornecida', () => {
      wrapper = mount(AppHeader);

      expect(wrapper.find('[data-testid="user-name"]').text()).toBe('Usuário');
    });
  });

  describe('Clique fora do dropdown', () => {
    it('Deveria fechar o dropdown quando clicar fora dele', async () => {
      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-testid="dropdown-profile"]').exists()).toBe(true);

      const outsideElement = document.createElement('div');
      const clickEvent = new Event('click');
      Object.defineProperty(clickEvent, 'target', {
        value: outsideElement,
        writable: false,
      });

      wrapper.vm.handleClickOutside(clickEvent);
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-testid="dropdown-profile"]').exists()).toBe(false);
    });

    it('Deveria manter o dropdown aberto quando clicar no dropdown', async () => {
      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-testid="dropdown-profile"]').exists()).toBe(true);

      const dropdownElement = wrapper.find('[data-testid="user-dropdown"]').element;

      const clickEvent = new Event('click');
      Object.defineProperty(clickEvent, 'target', {
        value: dropdownElement,
        writable: false,
      });

      wrapper.vm.handleClickOutside(clickEvent);
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-testid="dropdown-profile"]').exists()).toBe(true);
    });

    it('Deveria fechar o dropdown quando clicar em um item do dropdown', async () => {
      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('[data-testid="dropdown-profile"]').exists()).toBe(true);

      const dropdownItem = wrapper.find('[data-testid="dropdown-profile-update"]').element;

      const clickEvent = new Event('click');
      Object.defineProperty(clickEvent, 'target', {
        value: dropdownItem,
        writable: false,
      });

      wrapper.vm.handleClickOutside(clickEvent);
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-testid="dropdown-profile"]').exists()).toBe(true);
    });
  });

  describe('Toasts do Logout', () => {
    it('Deveria exibir toast de sucesso quando logout for bem-sucedido', async () => {
      const mockResponse: LogoutResponse = {
        message: 'Logout realizado com sucesso!',
      };

      const mockMutation = {
        data: { value: null },
        error: { value: null },
        isLoading: { value: false },
        isError: { value: false },
        isSuccess: { value: false },
        isPending: { value: false },
        mutate: vi.fn((_payload, callbacks) => {
          callbacks.onSuccess(mockResponse);
        }),
        mutateAsync: vi.fn(),
        reset: vi.fn(),
      };

      vi.mocked(useMutation).mockReturnValueOnce(mockMutation as any);

      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();

      const logoutOption = wrapper.find('[data-testid="dropdown-profile-logout"]');
      await logoutOption.trigger('click');

      expect(mockToast.success).toHaveBeenCalledWith(
        'Logout realizado com sucesso!',
        { autoClose: 3000 }
      );
    });

    it('Deveria exibir toast de sucesso com mensagem padrão quando não houver mensagem na resposta', async () => {
      const mockResponse: LogoutResponse = {
        message: '',
      };

      const mockMutation = {
        data: { value: null },
        error: { value: null },
        isLoading: { value: false },
        isError: { value: false },
        isSuccess: { value: false },
        isPending: { value: false },
        mutate: vi.fn((_payload, callbacks) => {
          callbacks.onSuccess(mockResponse);
        }),
        mutateAsync: vi.fn(),
        reset: vi.fn(),
      };

      vi.mocked(useMutation).mockReturnValueOnce(mockMutation as any);

      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();

      const logoutOption = wrapper.find('[data-testid="dropdown-profile-logout"]');
      await logoutOption.trigger('click');

      expect(mockToast.success).toHaveBeenCalledWith(
        'O usuário foi deslogado com sucesso!',
        { autoClose: 3000 }
      );
    });

    it('Deveria exibir toast de erro quando logout falhar', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Erro interno do servidor',
          },
        },
      };

      const mockMutation = {
        data: { value: null },
        error: { value: null },
        isLoading: { value: false },
        isError: { value: false },
        isSuccess: { value: false },
        isPending: { value: false },
        mutate: vi.fn((_payload, callbacks) => {
          callbacks.onError(mockError);
        }),
        mutateAsync: vi.fn(),
        reset: vi.fn(),
      };

      vi.mocked(useMutation).mockReturnValueOnce(mockMutation as any);

      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();

      const logoutOption = wrapper.find('[data-testid="dropdown-profile-logout"]');
      await logoutOption.trigger('click');

      expect(mockToast.error).toHaveBeenCalledWith(
        'Erro interno do servidor',
        { autoClose: 5000 }
      );
    });

    it('Deveria exibir toast de erro com mensagem padrão quando não houver mensagem de erro', async () => {
      const mockError = {
        response: {
          data: {},
        },
      };

      const mockMutation = {
        data: { value: null },
        error: { value: null },
        isLoading: { value: false },
        isError: { value: false },
        isSuccess: { value: false },
        isPending: { value: false },
        mutate: vi.fn((_payload, callbacks) => {
          callbacks.onError(mockError);
        }),
        mutateAsync: vi.fn(),
        reset: vi.fn(),
      };

      vi.mocked(useMutation).mockReturnValueOnce(mockMutation as any);

      wrapper = mount(AppHeader);

      const dropdown = wrapper.find('[data-testid="user-dropdown"]');
      await dropdown.trigger('click');
      await wrapper.vm.$nextTick();

      const logoutOption = wrapper.find('[data-testid="dropdown-profile-logout"]');
      await logoutOption.trigger('click');

      expect(mockToast.error).toHaveBeenCalledWith(
        'Erro ao realizar logout',
        { autoClose: 5000 }
      );
    });
  });
});
