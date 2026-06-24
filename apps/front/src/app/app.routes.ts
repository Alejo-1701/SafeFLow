import { Route } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { LoginPageComponent } from './features/auth/login/login-page.component';
import { ResidentePageComponent } from './features/portal/residente/residente-page.component';
import { AdminPageComponent } from './features/portal/administracion/admin-page.component';
import { VigilanciaPageComponent } from './features/portal/vigilancia/vigilancia-page.component';
import { PropietarioPageComponent } from './features/portal/propietario/propietario-page.component';
import { authGuard } from './core/auth/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'portal/residente',
    component: ResidentePageComponent,
    canActivate: [authGuard],
    data: { role: 'residente' },
  },
  {
    path: 'portal/vigilancia',
    component: VigilanciaPageComponent,
    canActivate: [authGuard],
    data: { role: 'vigilancia' },
  },
  {
    path: 'portal/administracion',
    component: AdminPageComponent,
    canActivate: [authGuard],
    data: { role: 'administrador' },
  },
  {
    path: 'portal/propietario',
    component: PropietarioPageComponent,
    canActivate: [authGuard],
    data: { role: 'propietario' },
  },
];
