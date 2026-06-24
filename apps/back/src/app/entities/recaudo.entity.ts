import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tarifa } from './tarifa.entity';
import { Pago } from './pago.entity';

@Entity()
export class Recaudo {
  @PrimaryGeneratedColumn()
  id_recaudo: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  sub_total?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total_pagado?: number;

  @Column({ length: 2 })
  dia: string;

  @Column({ length: 2 })
  mes: string;

  @Column({ length: 4 })
  anio: string;

  @ManyToOne(() => Tarifa, (t) => t.recaudos)
  @JoinColumn({ name: 'id_tarifa' })
  tarifa: Tarifa;

  @ManyToOne(() => Pago, (p) => p.recaudos)
  @JoinColumn({ name: 'id_pago' })
  pago: Pago;
}
