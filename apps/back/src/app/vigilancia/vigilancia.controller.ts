import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VigilanciaService } from './vigilancia.service';

@Controller('vigilancia')
@UseGuards(JwtAuthGuard)
export class VigilanciaController {
  constructor(private readonly vigilanciaService: VigilanciaService) {}

  @Get('autorizaciones')
  getAutorizaciones() {
    return this.vigilanciaService.getAutorizaciones();
  }

  @Get('monitor')
  getMonitor() {
    return this.vigilanciaService.getMonitor();
  }

  @Get('historial')
  getHistorial() {
    return this.vigilanciaService.getHistorial();
  }
}
