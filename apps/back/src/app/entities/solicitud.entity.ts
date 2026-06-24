import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';

@Entity()
export class Solicitud {
  @PrimaryGeneratedColumn()
  id_solicitud: number;

  @Column({ length: 2 })
  dia: string;

  @Column({ length: 2 })
  mes: string;

  @Column({ length: 4 })
  anio: string;

  @ManyToOne(() => Persona, (p) => p.solicitudes)
  @JoinColumn({ name: 'num_documento' })
  persona: Persona;
}
