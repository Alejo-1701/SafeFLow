import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan } from 'typeorm';
import { Persona } from '../entities/persona.entity';
import { Parqueadero } from '../entities/parqueadero.entity';
import { Incidentes } from '../entities/incidentes.entity';
import { RegistroAcceso } from '../entities/registro-acceso.entity';
import { Recaudo } from '../entities/recaudo.entity';
import { PersonasEmail } from '../entities/personas-email.entity';
import { AdminDashboardResponse, RecentActivityItem, UserRecordItem } from './dto/admin-response.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
    @InjectRepository(Parqueadero)
    private readonly parqueaderoRepo: Repository<Parqueadero>,
    @InjectRepository(Incidentes)
    private readonly incidentesRepo: Repository<Incidentes>,
    @InjectRepository(RegistroAcceso)
    private readonly registroRepo: Repository<RegistroAcceso>,
    @InjectRepository(Recaudo)
    private readonly recaudoRepo: Repository<Recaudo>,
    @InjectRepository(PersonasEmail)
    private readonly emailRepo: Repository<PersonasEmail>,
  ) {}

  async getDashboard(): Promise<AdminDashboardResponse> {
    const [kpis, recentActivity, users, totalResidents] = await Promise.all([
      this.getKpis(),
      this.getRecentActivity(),
      this.getUsers(),
      this.getTotalResidents(),
    ]);

    return { kpis, recentActivity, users, totalResidents };
  }

  private async getKpis() {
    const totalParqueaderos = await this.parqueaderoRepo.count();
    const ocupados = await this.parqueaderoRepo.count({ where: { estado: 'ocupado' } });
    const ocupacion = totalParqueaderos > 0 ? Math.round((ocupados / totalParqueaderos) * 100) : 0;

    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const anio = String(now.getFullYear());

    const recaudoHoy = await this.recaudoRepo
      .createQueryBuilder('r')
      .select('COALESCE(SUM(r.total_pagado), 0)', 'total')
      .where('r.dia = :dia', { dia })
      .andWhere('r.mes = :mes', { mes })
      .andWhere('r.anio = :anio', { anio })
      .getRawOne<{ total: number }>();

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const alertas = await this.incidentesRepo.count({
      where: { dia, mes, anio },
    });

    const visitantesHoy = await this.registroRepo.count({
      where: {
        fecha_hora_entrada: MoreThanOrEqual(hoy),
      },
    });

    return {
      ocupacion,
      recaudoHoy: Number(recaudoHoy?.total ?? 0),
      alertas,
      visitantesHoy,
    };
  }

  private async getRecentActivity(): Promise<RecentActivityItem[]> {
    const registros = await this.registroRepo.find({
      relations: {
        vehiculo: { propietario: true },
      },
      order: { fecha_hora_entrada: 'DESC' },
      take: 10,
    });

    return registros.map((r) => {
      const esResidente = r.vehiculo?.propietario?.rol !== undefined;
      return {
        plate: r.vehiculo?.placa ?? '—',
        type: esResidente ? 'residente' : 'visitante',
        time: r.fecha_hora_entrada
          ? r.fecha_hora_entrada.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
          : '—',
      };
    });
  }

  private async getUsers(): Promise<UserRecordItem[]> {
    const personas = await this.personaRepo.find({
      relations: { apartamento: true },
      take: 50,
    });

    const emails = await this.emailRepo.find();

    const emailMap = new Map<string, string>();
    for (const e of emails) {
      emailMap.set(e.persona?.num_documento ?? '', e.email);
    }

    return personas.map((p) => {
      const nombres = [p.nombre_p, p.nombre_s].filter(Boolean).join(' ');
      const apellidos = [p.apellido_p, p.apellido_m].filter(Boolean).join(' ');
      const name = `${nombres} ${apellidos}`;
      const email = emailMap.get(p.num_documento) ?? '—';

      return {
        unit: p.apartamento
          ? `${p.apartamento.torre}-${String(p.apartamento.num_apartamento).padStart(3, '0')}`
          : '—',
        isActive: true,
        lastAccess: '—',
        name,
        email,
        initials: (p.nombre_p?.[0] ?? '') + (p.apellido_p?.[0] ?? ''),
      };
    });
  }

  private async getTotalResidents(): Promise<number> {
    return this.personaRepo.count();
  }
}
