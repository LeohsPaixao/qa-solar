import LoginTemplate from '@/modules/auth/components/login/LoginTemplate.vue';
import ProfileTemplate from '@/modules/user/components/profile/ProfileTemplate.vue';
import RegisterTemplate from '@/modules/user/components/register/RegisterTemplate.vue';
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
