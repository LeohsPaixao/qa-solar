import LoginTemplate from '@/modules/auth/components/login/LoginTemplate.vue';
import RecoverPasswordTemplate from '@/modules/auth/components/recoverPassword/RecoverPasswordTemplate.vue';
import ListUsersTemplate from '@/modules/user/components/list/ListUsersTemplate.vue';
import ProfileTemplate from '@/modules/user/components/profile/ProfileTemplate.vue';
import RegisterTemplate from '@/modules/user/components/register/RegisterTemplate.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/AppHome.vue';
import { authGuard } from '../utils/authGuards';

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
    meta: { requiresAuth: true },
  },
  {
    path: '/listusers',
    name: 'ListUsers',
    component: ListUsersTemplate,
    meta: { requiresAuth: true },
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

router.beforeEach(authGuard);

export default router;
