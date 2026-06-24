import { ChangeDetectionStrategy, Component, inject, Type, OnInit } from '@angular/core';
import { DecimalPipe, NgComponentOutlet } from '@angular/common';
import {
  LucideArrowUpRight,
  LucideChevronLeft,
  LucideChevronRight,
  LucideDollarSign,
  LucideFileSpreadsheet,
  LucideLayoutDashboard,
  LucideLogOut,
  LucideMapPinned,
  LucideSearch,
  LucideSettings,
  LucideTrendingUp,
  LucideTriangleAlert,
  LucideUserRound,
  LucideUsers,
} from '@lucide/angular';
import { AuthService } from '../../../core/auth/auth.service';
import { PortalService, AdminDashboard } from '../../../core/services/portal.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgComponentOutlet,
    DecimalPipe,
    LucideLayoutDashboard,
    LucideUsers,
    LucideMapPinned,
    LucideDollarSign,
    LucideFileSpreadsheet,
    LucideSettings,
    LucideLogOut,
    LucideUserRound,
    LucideTrendingUp,
    LucideTriangleAlert,
    LucideArrowUpRight,
    LucideSearch,
    LucideChevronLeft,
    LucideChevronRight,
  ],
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly portalService = inject(PortalService);

  protected dashboard: AdminDashboard | null = null;

  protected readonly menuItems: { label: string; icon: Type<unknown>; active: boolean }[] = [
    { label: 'Dashboard', icon: LucideLayoutDashboard, active: true },
    { label: 'Residentes', icon: LucideUsers, active: false },
    { label: 'Mapa', icon: LucideMapPinned, active: false },
    { label: 'Recaudos', icon: LucideDollarSign, active: false },
    { label: 'Solicitudes', icon: LucideFileSpreadsheet, active: false },
    { label: 'Reportes', icon: LucideTrendingUp, active: false },
    { label: 'Configuración', icon: LucideSettings, active: false },
  ];

  ngOnInit(): void {
    this.portalService.getDashboard().subscribe((data) => {
      this.dashboard = data;
    });
  }

  protected get recentActivity() {
    return this.dashboard?.recentActivity ?? [];
  }

  protected get users() {
    return this.dashboard?.users ?? [];
  }

  protected get totalResidents() {
    return this.dashboard?.totalResidents ?? 0;
  }

  protected get kpis() {
    return this.dashboard?.kpis;
  }

  protected onLogout(): void {
    this.authService.logout();
  }
}
