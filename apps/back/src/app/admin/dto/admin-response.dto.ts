export interface RecentActivityItem {
  plate: string;
  type: 'residente' | 'visitante';
  time: string;
}

export interface UserRecordItem {
  unit: string;
  isActive: boolean;
  lastAccess: string;
  name: string;
  email: string;
  initials: string;
}

export interface AdminDashboardResponse {
  kpis: {
    ocupacion: number;
    recaudoHoy: number;
    alertas: number;
    visitantesHoy: number;
  };
  recentActivity: RecentActivityItem[];
  users: UserRecordItem[];
  totalResidents: number;
}
