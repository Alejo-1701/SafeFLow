import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidenteController } from './residente.controller';
import { ResidenteService } from './residente.service';
import { Persona } from '../entities/persona.entity';
import { Vehiculos } from '../entities/vehiculos.entity';
import { Solicitud } from '../entities/solicitud.entity';
import { AutorizacionVisita } from '../entities/autorizacion-visita.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Persona, Vehiculos, Solicitud, AutorizacionVisita]),
    AuthModule,
  ],
  controllers: [ResidenteController],
  providers: [ResidenteService],
})
export class ResidenteModule {}
