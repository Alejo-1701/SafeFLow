import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';

@Entity()
export class PersonasTelefono {
  @PrimaryGeneratedColumn()
  id_telefono: number;

  @Column({ length: 20 })
  telefono: string;

  @ManyToOne(() => Persona, (p) => p.telefonos)
  @JoinColumn({ name: 'num_documento' })
  persona: Persona;
}
