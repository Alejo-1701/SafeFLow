import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VigilanciaController } from './vigilancia.controller';
import { VigilanciaService } from './vigilancia.service';
import { AutorizacionVisita } from '../entities/autorizacion-visita.entity';
import { RegistroAcceso } from '../entities/registro-acceso.entity';
import { Pago } from '../entities/pago.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AutorizacionVisita, RegistroAcceso, Pago]),
    AuthModule,
  ],
  controllers: [VigilanciaController],
  providers: [VigilanciaService],
})
export class VigilanciaModule {}
