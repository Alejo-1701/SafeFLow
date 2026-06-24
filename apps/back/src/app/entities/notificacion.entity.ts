import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';

@Entity()
export class Notificacion {
  @PrimaryGeneratedColumn()
  id_notificacion: number;

  @Column({ length: 50 })
  tipo: string;

  @Column({ type: 'text' })
  mensaje: string;

  @Column({ default: false })
  leido: boolean;

  @Column({ length: 50, nullable: true })
  nuevo_estado?: string;

  @Column({ nullable: true })
  duracion_estado?: number;

  @ManyToOne(() => Persona, (p) => p.notificaciones)
  @JoinColumn({ name: 'num_documento' })
  persona: Persona;
}
