import { isAuthenticated } from './isAuthenticated';

/**
 * Guard de autenticação para rotas protegidas
 * @param to - Rota de destino
 * @param from - Rota de origem
 * @param next - Função de navegação
 */
export const authGuard = (to: any, _from: any, next: any) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/');
  } else {
    next();
  }
};
