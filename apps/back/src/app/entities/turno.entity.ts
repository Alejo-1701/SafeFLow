import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';
import { EmpresaVigilancia } from './empresa-vigilancia.entity';
import { Pago } from './pago.entity';
import { RegistroAcceso } from './registro-acceso.entity';
import { AutorizacionVisita } from './autorizacion-visita.entity';

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  id_turno: number;

  @Column({ type: 'time', nullable: true })
  hora_inicio?: string;

  @Column({ type: 'time', nullable: true })
  hora_fin?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  recaudo_esperado?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  recaudo_fisico?: number;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @ManyToOne(() => EmpresaVigilancia, (empresa) => empresa.turnos, {
    nullable: true,
  })
  @JoinColumn({ name: 'nit_empresa' })
  empresa?: EmpresaVigilancia;

  @ManyToOne(() => Persona, (p) => p.turnos)
  @JoinColumn({ name: 'num_documento' })
  guardia: Persona;

  @OneToMany(() => Pago, (pago) => pago.turno)
  pagos?: Pago[];

  @OneToMany(() => RegistroAcceso, (r) => r.turno)
  registros_acceso?: RegistroAcceso[];

  @OneToMany(() => AutorizacionVisita, (a) => a.turno)
  autorizaciones?: AutorizacionVisita[];
}
