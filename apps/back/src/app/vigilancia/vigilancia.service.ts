import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, IsNull } from 'typeorm';
import { AutorizacionVisita } from '../entities/autorizacion-visita.entity';
import { RegistroAcceso } from '../entities/registro-acceso.entity';
import { Pago } from '../entities/pago.entity';
import { VisitorRequestItem, MonitorItem, HistoryItem } from './dto/vigilancia-response.dto';

@Injectable()
export class VigilanciaService {
  constructor(
    @InjectRepository(AutorizacionVisita)
    private readonly autorizacionRepo: Repository<AutorizacionVisita>,
    @InjectRepository(RegistroAcceso)
    private readonly registroRepo: Repository<RegistroAcceso>,
    @InjectRepository(Pago)
    private readonly pagoRepo: Repository<Pago>,
  ) {}

  async getAutorizaciones(): Promise<VisitorRequestItem[]> {
    const autorizaciones = await this.autorizacionRepo.find({
      where: [
        { estado: 'pendiente' },
        { estado: 'autorizado' },
      ],
      relations: {
        visitante: { apartamento: true },
      },
      order: { anio: 'DESC', mes: 'DESC', dia: 'DESC' },
      take: 20,
    });

    return autorizaciones.map((a) => {
      const apto = a.visitante?.apartamento;
      const location = apto
        ? `Torre ${apto.torre} - Apt ${String(apto.num_apartamento).padStart(3, '0')}`
        : '—';

      return {
        name: a.visitante
          ? `${a.visitante.nombre_p} ${a.visitante.apellido_p}`
          : '—',
        status: a.estado === 'autorizado' ? 'autorizado' as const : 'pendiente' as const,
        location,
        time: `${a.dia}/${a.mes}/${a.anio}`,
      };
    });
  }

  async getMonitor(): Promise<MonitorItem[]> {
    const registros = await this.registroRepo.find({
      where: {
        fecha_hora_salida: IsNull(),
      },
      relations: {
        vehiculo: { propietario: { apartamento: true } },
      },
      order: { fecha_hora_entrada: 'DESC' },
      take: 20,
    });

    return registros.map((r) => {
      const entrada = r.fecha_hora_entrada ?? new Date();
      const ahora = new Date();
      const diffMs = ahora.getTime() - entrada.getTime();
      const diffMin = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMin / 60);
      const mins = diffMin % 60;
      const duration = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')} h`;

      const apto = r.vehiculo?.propietario?.apartamento;
      const apartment = apto
        ? `${apto.torre}-${String(apto.num_apartamento).padStart(3, '0')}`
        : '—';

      const prop = r.vehiculo?.propietario;
      const name = prop ? `${prop.nombre_p} ${prop.apellido_p}` : '—';

      return {
        plate: r.vehiculo?.placa ?? '—',
        apartment,
        name,
        entry: entrada.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        status: 'aprobado' as const,
        duration,
        value: '—',
      };
    });
  }

  async getHistorial(): Promise<HistoryItem[]> {
    const pagos = await this.pagoRepo.find({
      relations: {
        registro_acceso: { vehiculo: true },
      },
      order: { anio: 'DESC', mes: 'DESC', dia: 'DESC' },
      take: 20,
    });

    return pagos.map((p) => {
      const entrada = p.registro_acceso?.fecha_hora_entrada;
      const salida = p.registro_acceso?.fecha_hora_salida;
      let duration = '—';
      if (entrada && salida) {
        const diffMs = salida.getTime() - entrada.getTime();
        const diffMin = Math.floor(diffMs / 60000);
        const hours = Math.floor(diffMin / 60);
        const mins = diffMin % 60;
        duration = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')} h`;
      }

      return {
        plate: p.registro_acceso?.vehiculo?.placa ?? '—',
        duration,
        value: `$${Number(p.monto_total).toLocaleString('es-CO')}`,
        time: `${p.dia}/${p.mes}/${p.anio}`,
      };
    });
  }
}
