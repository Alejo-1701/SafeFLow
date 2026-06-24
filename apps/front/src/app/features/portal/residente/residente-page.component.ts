import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideBell,
  LucideBike,
  LucideCar,
  LucideCarFront,
  LucideCheck,
  LucideEllipsisVertical,
  LucideFileText,
  LucideLogOut,
  LucidePen,
  LucidePlus,
  LucideScale,
  LucideScrollText,
  LucideUser,
  LucideUserPlus,
  LucideX,
} from '@lucide/angular';
import { AuthService } from '../../../core/auth/auth.service';
import { PortalService, ResidenteProfile, Vehicle, RequestItem, VisitRecord } from '../../../core/services/portal.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucidePen,
    LucideLogOut,
    LucideUser,
    LucideBell,
    LucideCheck,
    LucideX,
    LucideUserPlus,
    LucideCar,
    LucideCarFront,
    LucideBike,
    LucidePlus,
    LucideFileText,
    LucideScale,
    LucideScrollText,
    LucideEllipsisVertical,
  ],
  selector: 'app-residente-page',
  templateUrl: './residente-page.component.html',
  styleUrl: './residente-page.component.scss',
})
export class ResidentePageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly portalService = inject(PortalService);

  protected userName = 'Cargando...';
  protected userLocation = 'Cargando...';
  protected vehicles: Vehicle[] = [];
  protected requests: RequestItem[] = [];
  protected visitHistory: VisitRecord[] = [];

  ngOnInit(): void {
    this.portalService.getResidenteProfile().subscribe((p) => {
      this.userName = p.name;
      this.userLocation = p.location;
    });

    this.portalService.getVehiculos().subscribe((v) => {
      this.vehicles = v;
    });

    this.portalService.getSolicitudes().subscribe((s) => {
      this.requests = s;
    });

    this.portalService.getVisitas().subscribe((v) => {
      this.visitHistory = v;
    });
  }

  protected onLogout(): void {
    this.authService.logout();
  }
}
