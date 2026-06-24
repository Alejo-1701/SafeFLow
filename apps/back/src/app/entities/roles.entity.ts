import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Persona } from './persona.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ length: 100 })
  nombre_rol: string;

  @OneToMany(() => Persona, (persona) => persona.rol)
  personas?: Persona[];
}
