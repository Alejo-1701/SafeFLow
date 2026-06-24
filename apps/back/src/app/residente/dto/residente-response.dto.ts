export interface ResidenteProfile {
  name: string;
  location: string;
}

export interface VehicleItem {
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

export interface VisitRecordItem {
  id: string;
  date: string;
  visitor: string;
  vehicle: string;
  plate: string;
  status: 'ingreso' | 'salio' | 'rechazado';
  statusLabel: string;
}
