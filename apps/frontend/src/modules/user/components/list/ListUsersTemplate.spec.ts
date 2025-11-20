import '@/modules/user/components/list/utils/mocks';

import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockToast } from '../../../../../test/mocks/mockToast';
import ListUsersTemplate from './ListUsersTemplate.vue';

describe('ListUsersTemplate', () => {
  let wrapper: any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deveria ser possivel visualizar o componente', () => {
    wrapper = mount(ListUsersTemplate);
    expect(wrapper.find('[data-testid="table-users"]').exists()).toBe(true);
  });

  it('Deveria ser possivel visualizar todos os elementos do componente', async () => {
    wrapper = mount(ListUsersTemplate);
    await flushPromises();
    await wrapper.vm.$nextTick();

    const table = wrapper.find('[data-testid="table-users"]');
    const rows = table.findAll('tbody tr');
    expect(rows.length).toBe(10);
    expect(wrapper.find('[data-testid="checkbox-select-all"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="checkbox-select-users"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="btn-delete-user"]').exists()).toBe(true);
  });

  it('Deveria ser possível selecionar um usuário', async () => {
    wrapper = mount(ListUsersTemplate);
    await flushPromises();
    await wrapper.vm.$nextTick();

    const checkbox = wrapper.find('[data-testid="checkbox-select-users"]');
    await checkbox.setValue(true);
    expect(checkbox.element.checked).toBe(true);
  });

  it('Deveria ser possível selecionar todos os usuários', async () => {
    wrapper = mount(ListUsersTemplate);
    await flushPromises();
    await wrapper.vm.$nextTick();

    const checkbox = wrapper.find('[data-testid="checkbox-select-all"]');
    const checkboxes = wrapper.findAllComponents({ name: 'Checkbox' });
    await checkbox.setValue(true);
    expect(checkbox.element.checked).toBe(true);
    expect(checkboxes.every((checkbox: any) => checkbox.element.checked)).toBe(true);
  });

  it('Deveria limpar a seleção quando desmarcar o checkbox "selecionar todos" (else do toggleSelectAll)', async () => {
    wrapper = mount(ListUsersTemplate);
    await flushPromises();
    await wrapper.vm.$nextTick();

    const checkboxSelectAll = wrapper.find('[data-testid="checkbox-select-all"]');
    await checkboxSelectAll.setValue(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedUsers.length).toBeGreaterThan(0);
    expect(wrapper.vm.selectAll).toBe(true);

    await checkboxSelectAll.setValue(false);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedUsers).toEqual([]);
    expect(wrapper.vm.selectAll).toBe(false);
  });

  it('Deveria limpar a seleção quando toggleSelectAll é chamado com selectAll false (else do toggleSelectAll)', async () => {
    wrapper = mount(ListUsersTemplate);
    await flushPromises();
    await wrapper.vm.$nextTick();

    const checkboxes = wrapper.findAll('[data-testid="checkbox-select-users"]');
    await checkboxes[1].setValue(true);
    await checkboxes[2].setValue(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedUsers.length).toBeGreaterThan(0);
    expect(wrapper.vm.selectedUsers).toContain(2);
    expect(wrapper.vm.selectedUsers).toContain(3);

    const checkboxSelectAll = wrapper.find('[data-testid="checkbox-select-all"]');
    await checkboxSelectAll.setValue(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectAll).toBe(true);

    await checkboxSelectAll.setValue(false);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedUsers).toEqual([]);
    expect(wrapper.vm.selectAll).toBe(false);
  });

  it('Deveria limpar a seleção quando toggleSelectAll é chamado sem loggedInUser (else do toggleSelectAll - caso loggedInUser null)', async () => {
    wrapper = mount(ListUsersTemplate);
    await flushPromises();
    await wrapper.vm.$nextTick();

    const checkboxes = wrapper.findAll('[data-testid="checkbox-select-users"]');
    await checkboxes[1].setValue(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedUsers.length).toBeGreaterThan(0);

    wrapper.vm.selectAll = false;
    wrapper.vm.toggleSelectAll();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedUsers).toEqual([]);
  });

  it('Deveria ser possível excluir um usuário', async () => {
    wrapper = mount(ListUsersTemplate);
    await flushPromises();
    await wrapper.vm.$nextTick();

    const checkboxes = wrapper.findAll('[data-testid="checkbox-select-users"]');
    expect(checkboxes.length).toBeGreaterThan(0);

    const secondCheckbox = checkboxes[1];
    await secondCheckbox.setValue(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedUsers).toContain(2);

    const btnDeleteUser = wrapper.find('[data-testid="btn-delete-user"]');
    expect(btnDeleteUser.attributes('disabled')).toBeUndefined();

    await btnDeleteUser.trigger('click');
    await flushPromises();
    await wrapper.vm.$nextTick();

    expect(mockToast.success).toHaveBeenCalledWith('Usuário excluído com sucesso!', {
      autoClose: 3000,
    });
  });

  it('Deveria ser possível ver a mensagem de erro ao tentar excluir um usuário', async () => {
    wrapper = mount(ListUsersTemplate);
    await flushPromises();
    await wrapper.vm.$nextTick();

    const checkboxes = wrapper.findAll('[data-testid="checkbox-select-users"]');
    expect(checkboxes.length).toBeGreaterThan(0);

    const secondCheckbox = checkboxes[1];
    await secondCheckbox.setValue(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedUsers).toContain(2);

    const btnDeleteUser = wrapper.find('[data-testid="btn-delete-user"]');
    expect(btnDeleteUser.attributes('disabled')).toBeUndefined();

    await btnDeleteUser.trigger('click');
    await flushPromises();
    await wrapper.vm.$nextTick();

    expect(mockToast.error).toHaveBeenCalledWith('Erro ao excluir usuário(s)', {
      autoClose: 5000,
    });
  });

  it('Deveria ser possível usar os dados do usuário passado via props quando props.user é um objeto', async () => {
    const mockUser = {
      id: 2,
      full_name: 'Maria Santos',
      email: 'maria@example.com',
      phone: '21999887766',
      document: '98765432100',
      social_name: 'Maria',
    };

    wrapper = mount(ListUsersTemplate, {
      props: {
        users: [mockUser],
      },
    });
    await flushPromises();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-testid="table-users"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="table-users"]').text()).toContain('Maria Santos');
    expect(wrapper.find('[data-testid="table-users"]').text()).toContain('maria@example.com');
    expect(wrapper.find('[data-testid="table-users"]').text()).toContain('21999887766');
    expect(wrapper.find('[data-testid="table-users"]').text()).toContain('98765432100');
    expect(wrapper.find('[data-testid="table-users"]').text()).toContain('Maria');
  });

  it('Deveria ser possível usar o primeiro elemento do array quando props.user é um array', async () => {
    const mockUsers = [
      {
        id: 2,
        full_name: 'Maria Santos',
        email: 'maria@example.com',
        phone: '21999887766',
        document: '98765432100',
        social_name: 'Maria',
      },
    ];

    wrapper = mount(ListUsersTemplate, {
      props: {
        users: mockUsers,
      },
    });
    await flushPromises();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-testid="table-users"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="table-users"]').text()).toContain('Maria Santos');
    expect(wrapper.find('[data-testid="table-users"]').text()).toContain('maria@example.com');
    expect(wrapper.find('[data-testid="table-users"]').text()).toContain('21999887766');
    expect(wrapper.find('[data-testid="table-users"]').text()).toContain('98765432100');
    expect(wrapper.find('[data-testid="table-users"]').text()).toContain('Maria');
  });
});
