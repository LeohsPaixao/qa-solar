import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/modules/auth/components/login/LoginTemplate.vue') },
  { path: '/signup', component: () => import('@/modules/user/components/register/RegisterTemplate.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
