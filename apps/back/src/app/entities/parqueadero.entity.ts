import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Apartamento } from './apartamento.entity';
import { RegistroAcceso } from './registro-acceso.entity';

@Entity()
export class Parqueadero {
  @PrimaryGeneratedColumn()
  id_parqueadero: number;

  @Column({ length: 20 })
  tipo_celda: string;

  @Column({ length: 20, default: 'disponible' })
  estado: string;

  @ManyToOne(() => Apartamento, (apto) => apto.parqueaderos)
  @JoinColumn({ name: 'id_apartamento' })
  apartamento: Apartamento;

  @OneToMany(() => RegistroAcceso, (r) => r.parqueadero)
  registros_acceso?: RegistroAcceso[];
}
