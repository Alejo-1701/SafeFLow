import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';
import { RegistroAcceso } from './registro-acceso.entity';

@Entity()
export class Vehiculos {
  @PrimaryColumn({ length: 20 })
  placa: string;

  @Column({ length: 50, nullable: true })
  num_chasis?: string;

  @Column({ length: 30 })
  tipo: string;

  @Column({ length: 50, nullable: true })
  linea?: string;

  @Column({ length: 10, nullable: true })
  modelo?: string;

  @Column({ nullable: true })
  cilindraje?: number;

  @Column({ length: 30, nullable: true })
  color?: string;

  @Column({ length: 30, nullable: true })
  servicio?: string;

  @Column({ length: 30, nullable: true })
  clase_vehiculo?: string;

  @ManyToOne(() => Persona, (p) => p.vehiculos)
  @JoinColumn({ name: 'num_documento' })
  propietario: Persona;

  @OneToMany(() => RegistroAcceso, (r) => r.vehiculo)
  registros_acceso?: RegistroAcceso[];
}
