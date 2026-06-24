import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from '../entities/persona.entity';
import { Vehiculos } from '../entities/vehiculos.entity';
import { Solicitud } from '../entities/solicitud.entity';
import { AutorizacionVisita } from '../entities/autorizacion-visita.entity';
import { ResidenteProfile, VehicleItem, RequestItem, VisitRecordItem } from './dto/residente-response.dto';

@Injectable()
export class ResidenteService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
    @InjectRepository(Vehiculos)
    private readonly vehiculosRepo: Repository<Vehiculos>,
    @InjectRepository(Solicitud)
    private readonly solicitudRepo: Repository<Solicitud>,
    @InjectRepository(AutorizacionVisita)
    private readonly autorizacionRepo: Repository<AutorizacionVisita>,
  ) {}

  async getProfile(numDocumento: string): Promise<ResidenteProfile> {
    const persona = await this.personaRepo.findOne({
      where: { num_documento: numDocumento },
      relations: { apartamento: true },
    });

    if (!persona) {
      return { name: '—', location: '—' };
    }

    const nombres = [persona.nombre_p, persona.nombre_s].filter(Boolean).join(' ');
    const apellidos = [persona.apellido_p, persona.apellido_m].filter(Boolean).join(' ');
    const name = `${nombres} ${apellidos}`;
    const location = persona.apartamento
      ? `Torre ${persona.apartamento.torre} - Apt ${String(persona.apartamento.num_apartamento).padStart(3, '0')}`
      : '—';

    return { name, location };
  }

  async getVehiculos(numDocumento: string): Promise<VehicleItem[]> {
    const vehiculos = await this.vehiculosRepo.find({
      where: { propietario: { num_documento: numDocumento } },
    });

    return vehiculos.map((v, idx) => ({
      id: v.placa,
      name: v.linea ? `${v.tipo} ${v.linea}` : v.tipo,
      plate: v.placa,
      type: v.tipo.toLowerCase().includes('moto') ? 'motorcycle' as const : 'car' as const,
      isPrimary: idx === 0,
    }));
  }

  async getSolicitudes(numDocumento: string): Promise<RequestItem[]> {
    const solicitudes = await this.solicitudRepo.find({
      where: { persona: { num_documento: numDocumento } },
      order: { anio: 'DESC', mes: 'DESC', dia: 'DESC' },
    });

    return solicitudes.map((s, idx) => ({
      id: String(s.id_solicitud),
      title: `Solicitud #${s.id_solicitud}`,
      subtitle: `${s.dia}/${s.mes}/${s.anio}`,
      status: (idx === 0 ? 'en_proceso' : 'completado') as 'en_proceso' | 'completado',
    }));
  }

  async getVisitas(numDocumento: string): Promise<VisitRecordItem[]> {
    const visitas = await this.autorizacionRepo.find({
      where: { residente: { num_documento: numDocumento } },
      relations: { visitante: true },
      order: { anio: 'DESC', mes: 'DESC', dia: 'DESC' },
    });

    return visitas.map((v) => {
      const visitante = v.visitante;
      const visitorName = visitante
        ? `${visitante.nombre_p} ${visitante.apellido_p}`
        : '—';

      const statusMap: Record<string, { status: VisitRecordItem['status']; label: string }> = {
        pendiente: { status: 'rechazado', label: 'Pendiente' },
        autorizado: { status: 'ingreso', label: 'Ingresó' },
        finalizado: { status: 'salio', label: 'Salió' },
        rechazado: { status: 'rechazado', label: 'Rechazado' },
      };

      const { status, label } = statusMap[v.estado] ?? { status: 'rechazado' as const, label: v.estado };

      return {
        id: String(v.id_autorizacion),
        date: `${v.dia}/${v.mes}/${v.anio}`,
        visitor: visitorName,
        vehicle: '—',
        plate: '—',
        status,
        statusLabel: label,
      };
    });
  }
}
