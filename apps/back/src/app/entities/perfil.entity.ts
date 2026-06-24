import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Persona } from './persona.entity';

@Entity()
export class Perfil {
  @PrimaryColumn({ length: 20 })
  num_documento: string;

  @Column({ length: 255 })
  contrasenia: string;

  @OneToOne(() => Persona, (persona) => persona.perfil)
  @JoinColumn({ name: 'num_documento' })
  persona: Persona;
}
