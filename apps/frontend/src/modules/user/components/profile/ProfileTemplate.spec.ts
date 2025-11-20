import '@/modules/user/components/profile/utils/mocks';

import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProfileTemplate from './ProfileTemplate.vue';

describe('ProfileTemplate', () => {
  let wrapper: any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('Deveria renderizar o componente quando os dados do usuário estão disponíveis', () => {
    wrapper = mount(ProfileTemplate);

    expect(wrapper.find('[data-testid="profile-page"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="form-profile"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-fullname-profile"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-socialname-profile"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-phone-profile"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="input-cpfcnpj-profile"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="btn-save-profile"]').exists()).toBe(true);
  });

  it('Deveria ser possível visualizar os dados do usuários no perfil', () => {
    wrapper = mount(ProfileTemplate);

    expect(wrapper.find('[data-testid="input-fullname-profile"]').element.value).toBe('João Silva');
    expect(wrapper.find('[data-testid="input-socialname-profile"]').element.value).toBe('João');
    expect(wrapper.find('[data-testid="input-phone-profile"]').element.value).toBe('11987654321');
    expect(wrapper.find('[data-testid="input-cpfcnpj-profile"]').element.value).toBe('11144477735');
  });

  it('Deveria ser possível visualizar o erro de validação quando o nome completo está vazio', async () => {
    wrapper = mount(ProfileTemplate);
    await wrapper.vm.$nextTick();
    await flushPromises();

    const fullNameInput = wrapper.find('[data-testid="input-fullname-profile"]');
    await fullNameInput.setValue('');
    await fullNameInput.trigger('blur');
    await wrapper.vm.$nextTick();

    const formElement = wrapper.find('[data-testid="form-profile"]');
    await formElement.trigger('submit');
    await flushPromises();
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 10));

    const fullNameError = wrapper.find('[data-testid="input-error-fulname-profile"]');
    expect(fullNameError.exists()).toBe(true);
    expect(fullNameError.text()).toBe('O Nome Completo é obrigatório.');
  });

  it('Deveria ser possível visualizar o erro de validação quando o telefone estiver vazio', async () => {
    wrapper = mount(ProfileTemplate);
    await wrapper.vm.$nextTick();
    await flushPromises();

    const phoneInput = wrapper.find('[data-testid="input-phone-profile"]');
    await phoneInput.setValue('');
    await phoneInput.trigger('blur');
    await wrapper.vm.$nextTick();

    const formElement = wrapper.find('[data-testid="form-profile"]');
    await formElement.trigger('submit');
    await flushPromises();
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 10));

    const phoneError = wrapper.find('[data-testid="input-error-phone-profile"]');
    expect(phoneError.exists()).toBe(true);
    expect(phoneError.text()).toBe('O Telefone é obrigatório.');
  });

  it('Deveria ser possível visualizar o erro de validação quando o telefone estiver inválido', async () => {
    wrapper = mount(ProfileTemplate);
    await wrapper.vm.$nextTick();
    await flushPromises();

    const phoneInput = wrapper.find('[data-testid="input-phone-profile"]');
    await phoneInput.setValue('1234567890a');
    await phoneInput.trigger('blur');
    await wrapper.vm.$nextTick();

    const formElement = wrapper.find('[data-testid="form-profile"]');
    await formElement.trigger('submit');
    await flushPromises();
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 10));

    const phoneError = wrapper.find('[data-testid="input-error-phone-profile"]');
    expect(phoneError.exists()).toBe(true);
    expect(phoneError.text()).toBe('O telefone deve conter apenas números.');
  });

  it('Deveria ser possível visualizar o erro de validação quando o telefone tiver menos de 10 dígitos', async () => {
    wrapper = mount(ProfileTemplate);
    await wrapper.vm.$nextTick();
    await flushPromises();

    const phoneInput = wrapper.find('[data-testid="input-phone-profile"]');
    await phoneInput.setValue('123456789');
    await phoneInput.trigger('blur');
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 10));

    const phoneError = wrapper.find('[data-testid="input-error-phone-profile"]');
    expect(phoneError.exists()).toBe(true);
    expect(phoneError.text()).toBe('O telefone deve ter no mínimo 10 dígitos.');
  });

  it('Deveria ser possível visualizar o erro de validação quando o telefone tiver mais de 11 dígitos', async () => {
    wrapper = mount(ProfileTemplate);
    await wrapper.vm.$nextTick();
    await flushPromises();

    const phoneInput = wrapper.find('[data-testid="input-phone-profile"]');
    await phoneInput.setValue('123456789012');
    await phoneInput.trigger('blur');
    await wrapper.vm.$nextTick();
    await new Promise((resolve) => setTimeout(resolve, 10));

    const phoneError = wrapper.find('[data-testid="input-error-phone-profile"]');
    expect(phoneError.exists()).toBe(true);
    expect(phoneError.text()).toBe('O telefone deve ter no máximo 11 dígitos.');
  });

  it('Deveria usar os dados do usuário passado via props quando props.user é um objeto', async () => {
    const mockUser = {
      id: 2,
      full_name: 'Maria Santos',
      email: 'maria@example.com',
      phone: '21999887766',
      document: '98765432100',
      social_name: 'Maria',
    };

    wrapper = mount(ProfileTemplate, {
      props: {
        user: mockUser,
      },
    });

    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(wrapper.find('[data-testid="input-fullname-profile"]').element.value).toBe('Maria Santos');
    expect(wrapper.find('[data-testid="input-socialname-profile"]').element.value).toBe('Maria');
    expect(wrapper.find('[data-testid="input-phone-profile"]').element.value).toBe('21999887766');
    expect(wrapper.find('[data-testid="input-cpfcnpj-profile"]').element.value).toBe('98765432100');
  });

  it('Deveria usar o primeiro elemento do array quando props.user é um array', async () => {
    const mockUsers = [
      {
        id: 3,
        full_name: 'Pedro Oliveira',
        email: 'pedro@example.com',
        phone: '31988776655',
        document: '12345678901',
        social_name: 'Pedro',
      },
      {
        id: 4,
        full_name: 'Ana Costa',
        email: 'ana@example.com',
        phone: '41977665544',
        document: '98765432109',
      },
    ];

    wrapper = mount(ProfileTemplate, {
      props: {
        user: mockUsers as any,
      },
    });

    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(wrapper.find('[data-testid="input-fullname-profile"]').element.value).toBe('Pedro Oliveira');
    expect(wrapper.find('[data-testid="input-socialname-profile"]').element.value).toBe('Pedro');
    expect(wrapper.find('[data-testid="input-phone-profile"]').element.value).toBe('31988776655');
    expect(wrapper.find('[data-testid="input-cpfcnpj-profile"]').element.value).toBe('12345678901');
  });
});
