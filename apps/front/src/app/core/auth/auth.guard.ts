import { inject } from '@angular/core';
import { Router, type CanActivateFn, type ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login'], { queryParams: { redirect: route.url.join('/') } });
  }

  const requiredRole = route.data['role'];
  if (requiredRole && auth.userRole()?.toLowerCase() !== requiredRole) {
    const roleMap: Record<string, string> = {
      residente: '/portal/residente',
      vigilancia: '/portal/vigilancia',
      administrador: '/portal/administracion',
      propietario: '/portal/propietario',
    };
    const redirect = roleMap[auth.userRole()?.toLowerCase() ?? ''] || '/';
    return router.createUrlTree([redirect]);
  }

  return true;
};
