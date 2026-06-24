import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Turno } from './turno.entity';
import { RegistroAcceso } from './registro-acceso.entity';
import { Recaudo } from './recaudo.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto_total: number;

  @Column({ length: 50, nullable: true })
  metodo_pago?: string;

  @Column({ length: 2 })
  dia: string;

  @Column({ length: 2 })
  mes: string;

  @Column({ length: 4 })
  anio: string;

  @ManyToOne(() => Turno, (t) => t.pagos)
  @JoinColumn({ name: 'id_turno' })
  turno: Turno;

  @OneToOne(() => RegistroAcceso, (r) => r.pago)
  @JoinColumn({ name: 'id_registro' })
  registro_acceso: RegistroAcceso;

  @OneToMany(() => Recaudo, (r) => r.pago)
  recaudos?: Recaudo[];
}
