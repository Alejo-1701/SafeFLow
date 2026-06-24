import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Roles } from './roles.entity';
import { EmpresaVigilancia } from './empresa-vigilancia.entity';
import { Perfil } from './perfil.entity';
import { Turno } from './turno.entity';
import { Apartamento } from './apartamento.entity';
import { Vehiculos } from './vehiculos.entity';
import { Incidentes } from './incidentes.entity';
import { Notificacion } from './notificacion.entity';
import { Solicitud } from './solicitud.entity';
import { AutorizacionVisita } from './autorizacion-visita.entity';
import { PersonasTelefono } from './personas-telefono.entity';
import { PersonasEmail } from './personas-email.entity';

@Entity()
export class Persona {
  @PrimaryColumn({ length: 20 })
  num_documento: string;

  @Column({ length: 20 })
  tipo_documento: string;

  @Column({ length: 100 })
  nombre_p: string;

  @Column({ length: 100, nullable: true })
  nombre_s?: string;

  @Column({ length: 100 })
  apellido_p: string;

  @Column({ length: 100 })
  apellido_m: string;

  @ManyToOne(() => Roles, (rol) => rol.personas)
  @JoinColumn({ name: 'id_rol' })
  rol: Roles;

  @ManyToOne(() => EmpresaVigilancia, (empresa) => empresa.personal, {
    nullable: true,
  })
  @JoinColumn({ name: 'nit_empresa' })
  empresa?: EmpresaVigilancia;

  @OneToOne(() => Perfil, (perfil) => perfil.persona)
  perfil?: Perfil;

  @OneToMany(() => Turno, (turno) => turno.guardia)
  turnos?: Turno[];

  @ManyToOne(() => Apartamento, (apto) => apto.personas, { nullable: true })
  @JoinColumn({ name: 'id_apartamento' })
  apartamento?: Apartamento;

  @OneToMany(() => Vehiculos, (v) => v.propietario)
  vehiculos?: Vehiculos[];

  @OneToMany(() => Incidentes, (i) => i.persona)
  incidentes?: Incidentes[];

  @OneToMany(() => Notificacion, (n) => n.persona)
  notificaciones?: Notificacion[];

  @OneToMany(() => Solicitud, (s) => s.persona)
  solicitudes?: Solicitud[];

  @OneToMany(() => AutorizacionVisita, (a) => a.residente)
  autorizaciones_otorgadas?: AutorizacionVisita[];

  @OneToMany(() => AutorizacionVisita, (a) => a.visitante)
  visitas_autorizadas?: AutorizacionVisita[];

  @OneToMany(() => PersonasTelefono, (t) => t.persona)
  telefonos?: PersonasTelefono[];

  @OneToMany(() => PersonasEmail, (e) => e.persona)
  emails?: PersonasEmail[];
}
