import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';

@Entity()
export class Administrador {
  @PrimaryGeneratedColumn()
  id_admin: number;

  @Column({ length: 50 })
  rol: string;

  @Column({ type: 'date', nullable: true })
  inicio_gestion?: string;

  @Column({ type: 'date', nullable: true })
  fin_gestion?: string;

  @ManyToOne(() => Persona)
  @JoinColumn({ name: 'num_documento' })
  persona: Persona;
}
