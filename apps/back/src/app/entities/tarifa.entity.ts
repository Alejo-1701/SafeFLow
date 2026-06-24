import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { AsambleaCopropietarios } from './asamblea-copropietarios.entity';
import { Recaudo } from './recaudo.entity';

@Entity()
export class Tarifa {
  @PrimaryGeneratedColumn()
  id_tarifa: number;

  @Column({ length: 50 })
  tipo_vehiculo: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_minuto: number;

  @ManyToOne(() => AsambleaCopropietarios, (a) => a.tarifas)
  @JoinColumn({ name: 'id_asamblea' })
  asamblea: AsambleaCopropietarios;

  @OneToMany(() => Recaudo, (r) => r.tarifa)
  recaudos?: Recaudo[];
}
