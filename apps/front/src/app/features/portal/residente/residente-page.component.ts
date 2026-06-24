import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: 'car' | 'motorcycle';
  isPrimary: boolean;
}

interface RequestItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'en_proceso' | 'completado';
}

interface VisitRecord {
  id: string;
  date: string;
  visitor: string;
  vehicle: string;
  plate: string;
  status: 'ingreso' | 'salio' | 'rechazado';
  statusLabel: string;
}

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
export class ResidentePageComponent {
  private readonly router = inject(Router);

  protected readonly userName = 'Nombre de Usuario';
  protected readonly userLocation = 'Torre A - Apt 402';

  protected readonly vehicles: Vehicle[] = [];

  protected readonly requests: RequestItem[] = [];

  protected readonly visitHistory: VisitRecord[] = [];

  protected onLogout(): void {
    this.router.navigate(['/']);
  }
}
