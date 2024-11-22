import LoginTemplate from '@/modules/auth/components/login/LoginTemplate.vue';
import RegisterTemplate from '@/modules/user/components/register/RegisterTemplate.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginTemplate,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: RegisterTemplate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
