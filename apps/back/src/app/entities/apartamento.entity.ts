import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';
import { Parqueadero } from './parqueadero.entity';

@Entity()
export class Apartamento {
  @PrimaryGeneratedColumn()
  id_apartamento: number;

  @Column({ length: 10 })
  torre: string;

  @Column()
  num_apartamento: number;

  @ManyToOne(() => Persona, { nullable: true })
  @JoinColumn({ name: 'doc_responsable' })
  responsable?: Persona;

  @OneToMany(() => Persona, (persona) => persona.apartamento)
  personas?: Persona[];

  @OneToMany(() => Parqueadero, (p) => p.apartamento)
  parqueaderos?: Parqueadero[];
}
