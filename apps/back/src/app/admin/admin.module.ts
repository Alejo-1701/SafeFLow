import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Persona } from '../entities/persona.entity';
import { Parqueadero } from '../entities/parqueadero.entity';
import { Incidentes } from '../entities/incidentes.entity';
import { RegistroAcceso } from '../entities/registro-acceso.entity';
import { Recaudo } from '../entities/recaudo.entity';
import { PersonasEmail } from '../entities/personas-email.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Persona, Parqueadero, Incidentes, RegistroAcceso, Recaudo, PersonasEmail]),
    AuthModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
