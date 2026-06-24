import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';

@Entity()
export class PersonasEmail {
  @PrimaryGeneratedColumn()
  id_email: number;

  @Column({ length: 255 })
  email: string;

  @ManyToOne(() => Persona, (p) => p.emails)
  @JoinColumn({ name: 'num_documento' })
  persona: Persona;
}
