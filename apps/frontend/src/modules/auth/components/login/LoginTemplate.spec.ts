import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/composables/', () => ({
  useLoginUser: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

import LoginTemplate from './LoginTemplate.vue';

const form = {
  email: 'teste@example.com',
  password: '123456',
};

describe('LoginTemplate', () => {
  let wrapper: any;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it('Deveria ser possível preencher os campos de email e senha', () => {
    wrapper = mount(LoginTemplate);
    wrapper.find('[data-testid="input-email"]').setValue(form.email);
    wrapper.find('[data-testid="input-password"]').setValue(form.password);
    expect(wrapper.find('[data-testid="input-email"]').element.value).toBe(form.email);
    expect(wrapper.find('[data-testid="input-password"]').element.value).toBe(form.password);
  });

  it('Deveria ser possível visualizar os erros de validação abaixo dos inputs de email e senha quando o formulário for submetido com campos vazios', async () => {
    wrapper = mount(LoginTemplate);

    const formElement = wrapper.find('[data-testid="form-login"]');

    await formElement.trigger('submit');
    await flushPromises();
    await new Promise((resolve) => setTimeout(resolve, 10));

    const emailError = wrapper.find('[data-testid="message-error-email"]');
    const passwordError = wrapper.find('[data-testid="message-error-password"]');

    expect(emailError.exists()).toBe(true);
    expect(passwordError.exists()).toBe(true);
    expect(emailError.text()).toBe('O Email é obrigatório.');
    expect(passwordError.text()).toBe('A Senha é obrigatória.');
  });

  it('Deveria ser possível visualizar o erro de email inválido embaixo do input de email', async () => {
    wrapper = mount(LoginTemplate);
    wrapper.find('[data-testid="input-email"]').setValue('invalid-email');
    await flushPromises();
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(wrapper.find('[data-testid="message-error-email"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="message-error-email"]').text()).toBe('Email inválido.');
  });
});
