import LoginTemplate from '@/modules/auth/components/login/LoginTemplate.vue';
import RecoverPasswordTemplate from '@/modules/auth/components/recoverPassword/RecoverPasswordTemplate.vue';
import ProfileTemplate from '@/modules/user/components/profile/ProfileTemplate.vue';
import RegisterTemplate from '@/modules/user/components/register/RegisterTemplate.vue';
import ListUsersTemplate from '@/modules/user/components/list/ListUsersTemplate.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/AppHome.vue';

const isAuthenticated = () => {
  return !!localStorage.getItem('user-token');
};

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginTemplate,
  },
  {
    path: '/recover-password',
    name: 'Recover Password',
    component: RecoverPasswordTemplate,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: RegisterTemplate,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileTemplate,
  },
  {
    path: '/listusers',
    name: 'ListUsers',
    component: ListUsersTemplate,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/');
  } else {
    next();
  }
});

export default router;
