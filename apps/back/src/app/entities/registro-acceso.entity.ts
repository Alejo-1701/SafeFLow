import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Vehiculos } from './vehiculos.entity';
import { Parqueadero } from './parqueadero.entity';
import { Turno } from './turno.entity';
import { Pago } from './pago.entity';
import { AutorizacionVisita } from './autorizacion-visita.entity';

@Entity()
export class RegistroAcceso {
  @PrimaryGeneratedColumn()
  id_registro: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_hora_entrada?: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_hora_salida?: Date;

  @ManyToOne(() => Vehiculos, (v) => v.registros_acceso)
  @JoinColumn({ name: 'placa' })
  vehiculo: Vehiculos;

  @ManyToOne(() => Parqueadero, (p) => p.registros_acceso)
  @JoinColumn({ name: 'id_parqueadero' })
  parqueadero: Parqueadero;

  @ManyToOne(() => Turno, (t) => t.registros_acceso)
  @JoinColumn({ name: 'id_turno' })
  turno: Turno;

  @OneToOne(() => Pago, (pago) => pago.registro_acceso)
  pago?: Pago;

  @OneToOne(() => AutorizacionVisita, (a) => a.registro_acceso)
  autorizacion?: AutorizacionVisita;
}
