import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideBell,
  LucideBike,
  LucideCar,
  LucideCarFront,
  LucideCheck,
  LucideEllipsisVertical,
  LucideFileText,
  LucideLogOut,
    LucideCircleParking,
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
    LucideCircleParking,
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
  protected readonly userName = 'Danilo Betancurt';
  protected readonly userLocation = 'Torre A - Apt 402';

  protected readonly currentVisitor = {
    vehicle: 'Mazda CX-5',
    plate: 'ABC-123',
    driver: 'Juan Pérez',
  };

  protected readonly parkingStatus = {
    status: 'OCUPADO' as const,
    spot: 'Puesto #104',
    vehicle: 'Mazda CX-5',
    plate: 'ABC-123',
  };

  protected readonly vehicles: Vehicle[] = [
    { id: '1', name: 'Mazda CX-5', plate: 'KLT-890', type: 'car', isPrimary: true },
    { id: '2', name: 'Yamaha MT-03', plate: 'PQR-45H', type: 'motorcycle', isPrimary: false },
  ];

  protected readonly requests: RequestItem[] = [
    {
      id: '1',
      title: 'Reparación luminaria garaje',
      subtitle: 'Solicitado ayer',
      status: 'en_proceso',
    },
    {
      id: '2',
      title: 'Reserva Salón Social',
      subtitle: '12 Oct 2023',
      status: 'completado',
    },
  ];

  protected readonly visitHistory: VisitRecord[] = [
    { id: '1', date: '24 Jun 2026', visitor: 'Carlos Méndez', vehicle: 'Toyota Corolla', plate: 'XYZ-789', status: 'ingreso', statusLabel: 'Ingresó' },
    { id: '2', date: '23 Jun 2026', visitor: 'Ana Lucía Ramírez', vehicle: 'Chevrolet Spark', plate: 'LMN-456', status: 'salio', statusLabel: 'Salió' },
    { id: '3', date: '22 Jun 2026', visitor: 'Pedro Infante', vehicle: 'Nissan Versa', plate: 'QRS-012', status: 'rechazado', statusLabel: 'Rechazado' },
    { id: '4', date: '21 Jun 2026', visitor: 'María García', vehicle: 'Hyundai Tucson', plate: 'TUV-789', status: 'ingreso', statusLabel: 'Ingresó' },
  ];
}
