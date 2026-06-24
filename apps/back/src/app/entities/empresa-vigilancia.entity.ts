import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Persona } from './persona.entity';
import { Turno } from './turno.entity';

@Entity()
export class EmpresaVigilancia {
  @PrimaryColumn({ length: 20 })
  nit: string;

  @Column({ length: 200 })
  nom_empresa: string;

  @Column({ length: 200, nullable: true })
  rep_legal?: string;

  @Column({ length: 20, nullable: true })
  telefono?: string;

  @Column({ length: 255, nullable: true })
  email?: string;

  @OneToMany(() => Persona, (persona) => persona.empresa)
  personal?: Persona[];

  @OneToMany(() => Turno, (turno) => turno.empresa)
  turnos?: Turno[];
}
