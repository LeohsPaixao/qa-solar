import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Overview',
    component: () => import('../features/overview/OverviewPage.vue'),
  },
  {
    path: '/frameworks',
    name: 'Frameworks',
    component: () => import('../features/frameworks/FrameworkPage.vue'),
  },
  {
    path: '/frameworks/:name',
    name: 'FrameworkDetail',
    component: () => import('../features/frameworks/FrameworkPage.vue'),
    props: true,
  },
  {
    path: '/tests',
    name: 'Tests',
    component: () => import('../features/tests/TestsListPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
