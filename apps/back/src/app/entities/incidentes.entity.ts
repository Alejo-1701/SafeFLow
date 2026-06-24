import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';

@Entity()
export class Incidentes {
  @PrimaryGeneratedColumn()
  id_incidente: number;

  @Column({ length: 2 })
  dia: string;

  @Column({ length: 2 })
  mes: string;

  @Column({ length: 4 })
  anio: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  accion_tomada?: string;

  @ManyToOne(() => Persona, (p) => p.incidentes)
  @JoinColumn({ name: 'num_documento' })
  persona: Persona;
}
