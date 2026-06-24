import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideUsers,
  LucideShieldCheck,
  LucideChartColumnStacked,
  LucideBuilding2,
  LucideCamera,
} from '@lucide/angular';
import { PortalCardComponent, PortalCardItem } from '../../shared/ui/portal-card/portal-card.component';
import { StatusFooterComponent } from '../../shared/ui/status-footer/status-footer.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PortalCardComponent, StatusFooterComponent, LucideCamera],
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly router = inject(Router);

  protected readonly portals: PortalCardItem[] = [
    {
      title: 'Portal Residentes',
      description:
        'Gestiona tus vehiculos y autoriza tus visitas desde el celular de forma rapida y segura.',
      actionLabel: 'Entrar',
      icon: LucideUsers,
    },
    {
      title: 'Portal Vigilancia',
      description:
        'Control de entradas, salidas y validacion de placas mediante escaneo inteligente.',
      actionLabel: 'Entrar',
      icon: LucideShieldCheck,
    },
    {
      title: 'Portal Administracion',
      description:
        'Reportes detallados, estadisticas de ocupacion y configuracion integral del sistema.',
      actionLabel: 'Entrar',
      icon: LucideChartColumnStacked,
    },
    {
      title: 'Portal Propietario',
      description:
        'Gestiona tus propiedades, supervisa el estado de tus unidades y administra tus inquilinos.',
      actionLabel: 'Entrar',
      icon: LucideBuilding2,
    },
  ];

  protected onPortalClick(portal: PortalCardItem): void {
    const routes: Record<string, string> = {
      'Portal Residentes': '/portal/residente',
      'Portal Vigilancia': '/portal/vigilancia',
      'Portal Administracion': '/portal/administracion',
      'Portal Propietario': '/portal/propietario',
    };
    const dest = routes[portal.title] ?? '/';
    this.router.navigate(['/login'], { queryParams: { redirect: dest } });
  }
}
