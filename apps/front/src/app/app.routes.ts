import { Route } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
];
