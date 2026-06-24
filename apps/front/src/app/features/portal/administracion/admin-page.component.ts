import { ChangeDetectionStrategy, Component, inject, Type } from '@angular/core';
import { Router } from '@angular/router';
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

interface RecentActivity {
  plate: string;
  type: 'residente' | 'visitante';
  time: string;
}

interface UserRecord {
  unit: string;
  isActive: boolean;
  lastAccess: string;
  name: string;
  email: string;
  initials: string;
}

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
export class AdminPageComponent {
  private readonly router = inject(Router);

  protected readonly menuItems: { label: string; icon: Type<unknown>; active: boolean }[] = [
    { label: 'Dashboard', icon: LucideLayoutDashboard, active: true },
    { label: 'Residentes', icon: LucideUsers, active: false },
    { label: 'Mapa', icon: LucideMapPinned, active: false },
    { label: 'Recaudos', icon: LucideDollarSign, active: false },
    { label: 'Solicitudes', icon: LucideFileSpreadsheet, active: false },
    { label: 'Reportes', icon: LucideTrendingUp, active: false },
    { label: 'Configuración', icon: LucideSettings, active: false },
  ];

  protected readonly recentActivity: RecentActivity[] = [];

  protected readonly users: UserRecord[] = [];

  protected readonly totalResidents = 0;

  protected onLogout(): void {
    this.router.navigate(['/']);
  }
}
