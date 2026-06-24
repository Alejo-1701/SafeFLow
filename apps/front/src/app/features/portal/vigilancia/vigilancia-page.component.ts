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

  protected readonly visitorRequests: {
    name: string; status: 'autorizado' | 'pendiente'; location: string; time?: string;
  }[] = [];

  protected readonly monitorData: {
    plate: string; apartment: string; name: string; entry: string;
    status: 'aprobado' | 'pendiente' | 'rechazado'; duration: string; value: string;
  }[] = [];

  protected readonly historyData: {
    plate: string; duration: string; value: string; time: string;
  }[] = [];

  protected onLogout(): void {
    this.router.navigate(['/']);
  }
}
