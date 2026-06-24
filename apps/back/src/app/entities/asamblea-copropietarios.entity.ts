import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Tarifa } from './tarifa.entity';

@Entity()
export class AsambleaCopropietarios {
  @PrimaryGeneratedColumn()
  id_asamblea: number;

  @Column()
  num_acta: number;

  @Column({ length: 2 })
  dia: string;

  @Column({ length: 2 })
  mes: string;

  @Column({ length: 4 })
  anio: string;

  @Column({ length: 100, nullable: true })
  art_referencia?: string;

  @Column({ type: 'text', nullable: true })
  des_acuerdo?: string;

  @OneToMany(() => Tarifa, (t) => t.asamblea)
  tarifas?: Tarifa[];
}
