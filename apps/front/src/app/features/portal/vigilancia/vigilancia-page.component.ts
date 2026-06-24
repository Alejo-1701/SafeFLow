import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
import { AuthService } from '../../../core/auth/auth.service';
import { PortalService, VisitorRequest, MonitorItem, HistoryItem } from '../../../core/services/portal.service';

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
export class VigilanciaPageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly portalService = inject(PortalService);

  protected visitorRequests: VisitorRequest[] = [];
  protected monitorData: MonitorItem[] = [];
  protected historyData: HistoryItem[] = [];

  ngOnInit(): void {
    this.portalService.getAutorizaciones().subscribe((v) => {
      this.visitorRequests = v;
    });

    this.portalService.getMonitor().subscribe((m) => {
      this.monitorData = m;
    });

    this.portalService.getHistorial().subscribe((h) => {
      this.historyData = h;
    });
  }

  protected onLogout(): void {
    this.authService.logout();
  }
}
