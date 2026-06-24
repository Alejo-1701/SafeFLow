import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideArrowRight,
  LucideBan,
  LucideBookOpen,
  LucideBox,
  LucideCalendarClock,
  LucideChevronRight,
  LucideClock,
  LucideDoorOpen,
  LucideEye,
  LucideGripVertical,
  LucideLock,
  LucideLogOut,
  LucideMapPin,
  LucideOctagonAlert,
  LucidePhone,
  LucideRefreshCw,
  LucideSearch,
  LucideUserRound,
  LucideUsers,
} from '@lucide/angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideArrowRight,
    LucideBan,
    LucideBookOpen,
    LucideBox,
    LucideCalendarClock,
    LucideChevronRight,
    LucideClock,
    LucideDoorOpen,
    LucideEye,
    LucideGripVertical,
    LucideLock,
    LucideLogOut,
    LucideMapPin,
    LucideOctagonAlert,
    LucidePhone,
    LucideRefreshCw,
    LucideSearch,
    LucideUserRound,
    LucideUsers,
  ],
  selector: 'app-vigilancia-page',
  templateUrl: './vigilancia-page.component.html',
  styleUrl: './vigilancia-page.component.scss',
})
export class VigilanciaPageComponent {
  private readonly router = inject(Router);

  protected readonly visitorRequests = [
    {
      name: 'Maria López',
      status: 'autorizado' as const,
      location: 'Torre A - Apt 402',
      time: '11:00 AM',
    },
    {
      name: 'Carlos Ruiz',
      status: 'pendiente' as const,
      location: 'Torre C - Apt 105',
    },
  ];

  protected readonly monitorData = [
    {
      plate: 'KLM-987',
      apartment: 'Apto 204 - Torre 1',
      name: 'Juan Pérez',
      entry: '10:45 AM',
      status: 'aprobado' as const,
      duration: '1h 20m',
      value: '$2.500',
    },
    {
      plate: 'XYZ-456',
      apartment: 'Oficina 302',
      name: 'María García',
      entry: '11:02 AM',
      status: 'pendiente' as const,
      duration: '0h 45m',
      value: '$1.500',
    },
    {
      plate: 'BVC-112',
      apartment: 'Apto 101 - Torre 2',
      name: 'Pedro Salas',
      entry: '09:15 AM',
      status: 'rechazado' as const,
      duration: '3h 10m',
      value: '$6.000',
    },
  ];

  protected readonly historyData = [
    { plate: 'GHK-452', duration: '2h 15m', value: '$4.500', time: '11:30 AM' },
    { plate: 'MNB-098', duration: '0h 30m', value: '$1.000', time: '11:15 AM' },
    { plate: 'WER-234', duration: '4h 00m', value: '$8.000', time: '10:45 AM' },
  ];

  protected onLogout(): void {
    this.router.navigate(['/']);
  }
}
