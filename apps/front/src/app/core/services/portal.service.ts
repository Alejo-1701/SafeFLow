import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';

export interface AdminDashboard {
  kpis: {
    ocupacion: number;
    recaudoHoy: number;
    alertas: number;
    visitantesHoy: number;
  };
  recentActivity: { plate: string; type: 'residente' | 'visitante'; time: string }[];
  users: { unit: string; isActive: boolean; lastAccess: string; name: string; email: string; initials: string }[];
  totalResidents: number;
}

export interface ResidenteProfile {
  name: string;
  location: string;
}

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  type: 'car' | 'motorcycle';
  isPrimary: boolean;
}

export interface RequestItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'en_proceso' | 'completado';
}

export interface VisitRecord {
  id: string;
  date: string;
  visitor: string;
  vehicle: string;
  plate: string;
  status: 'ingreso' | 'salio' | 'rechazado';
  statusLabel: string;
}

export interface VisitorRequest {
  name: string;
  status: 'autorizado' | 'pendiente';
  location: string;
  time?: string;
}

export interface MonitorItem {
  plate: string;
  apartment: string;
  name: string;
  entry: string;
  status: 'aprobado' | 'pendiente' | 'rechazado';
  duration: string;
  value: string;
}

export interface HistoryItem {
  plate: string;
  duration: string;
  value: string;
  time: string;
}

@Injectable({ providedIn: 'root' })
export class PortalService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly apiUrl = 'http://localhost:3000/api';

  private headers() {
    return { Authorization: `Bearer ${this.auth.getToken()}` };
  }

  getDashboard() {
    return this.http.get<AdminDashboard>(`${this.apiUrl}/admin/dashboard`, {
      headers: this.headers(),
    });
  }

  getResidenteProfile() {
    return this.http.get<ResidenteProfile>(`${this.apiUrl}/residente/profile`, {
      headers: this.headers(),
    });
  }

  getVehiculos() {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/residente/vehiculos`, {
      headers: this.headers(),
    });
  }

  getSolicitudes() {
    return this.http.get<RequestItem[]>(`${this.apiUrl}/residente/solicitudes`, {
      headers: this.headers(),
    });
  }

  getVisitas() {
    return this.http.get<VisitRecord[]>(`${this.apiUrl}/residente/visitas`, {
      headers: this.headers(),
    });
  }

  getAutorizaciones() {
    return this.http.get<VisitorRequest[]>(`${this.apiUrl}/vigilancia/autorizaciones`, {
      headers: this.headers(),
    });
  }

  getMonitor() {
    return this.http.get<MonitorItem[]>(`${this.apiUrl}/vigilancia/monitor`, {
      headers: this.headers(),
    });
  }

  getHistorial() {
    return this.http.get<HistoryItem[]>(`${this.apiUrl}/vigilancia/historial`, {
      headers: this.headers(),
    });
  }
}
