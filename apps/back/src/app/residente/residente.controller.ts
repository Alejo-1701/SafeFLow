import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResidenteService } from './residente.service';

@Controller('residente')
@UseGuards(JwtAuthGuard)
export class ResidenteController {
  constructor(private readonly residenteService: ResidenteService) {}

  @Get('profile')
  getProfile(@Req() req: { user: { num_documento: string } }) {
    return this.residenteService.getProfile(req.user.num_documento);
  }

  @Get('vehiculos')
  getVehiculos(@Req() req: { user: { num_documento: string } }) {
    return this.residenteService.getVehiculos(req.user.num_documento);
  }

  @Get('solicitudes')
  getSolicitudes(@Req() req: { user: { num_documento: string } }) {
    return this.residenteService.getSolicitudes(req.user.num_documento);
  }

  @Get('visitas')
  getVisitas(@Req() req: { user: { num_documento: string } }) {
    return this.residenteService.getVisitas(req.user.num_documento);
  }
}
