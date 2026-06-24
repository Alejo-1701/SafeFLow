import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';
import { Turno } from './turno.entity';
import { RegistroAcceso } from './registro-acceso.entity';
import { Notificacion } from './notificacion.entity';

@Entity()
export class AutorizacionVisita {
  @PrimaryGeneratedColumn()
  id_autorizacion: number;

  @Column({ length: 2 })
  dia: string;

  @Column({ length: 2 })
  mes: string;

  @Column({ length: 4 })
  anio: string;

  @Column({ length: 20, default: 'pendiente' })
  estado: string;

  @ManyToOne(() => Persona, (p) => p.autorizaciones_otorgadas)
  @JoinColumn({ name: 'num_documento_residente' })
  residente: Persona;

  @ManyToOne(() => Persona, (p) => p.visitas_autorizadas)
  @JoinColumn({ name: 'num_documento_visitante' })
  visitante: Persona;

  @ManyToOne(() => Turno, (t) => t.autorizaciones)
  @JoinColumn({ name: 'id_turno' })
  turno: Turno;

  @OneToOne(() => RegistroAcceso, (r) => r.autorizacion)
  @JoinColumn({ name: 'id_registro' })
  registro_acceso?: RegistroAcceso;

  @ManyToOne(() => Notificacion, { nullable: true })
  @JoinColumn({ name: 'id_notificacion' })
  notificacion?: Notificacion;
}
