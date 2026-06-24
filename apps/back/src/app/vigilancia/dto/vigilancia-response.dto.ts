export interface VisitorRequestItem {
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
