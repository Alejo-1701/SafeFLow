import { Route } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';
import { LoginPageComponent } from './features/auth/login/login-page.component';
import { ResidentePageComponent } from './features/portal/residente/residente-page.component';
import { AdminPageComponent } from './features/portal/administracion/admin-page.component';

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
  },
  {
    path: 'portal/administracion',
    component: AdminPageComponent,
  },
];
