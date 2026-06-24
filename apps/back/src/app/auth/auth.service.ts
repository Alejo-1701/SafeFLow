import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Persona } from '../entities/persona.entity';
import { Perfil } from '../entities/perfil.entity';
import { LoginDto, LoginResponse } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
    @InjectRepository(Perfil)
    private readonly perfilRepo: Repository<Perfil>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponse> {
    const persona = await this.personaRepo.findOne({
      where: { num_documento: dto.num_documento },
      relations: { rol: true },
    });

    if (!persona) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const perfil = await this.perfilRepo.findOne({
      where: { num_documento: dto.num_documento },
    });

    if (!perfil) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const valid = await bcrypt.compare(dto.contrasenia, perfil.contrasenia);
    if (!valid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: persona.num_documento,
      rol: persona.rol?.nombre_rol ?? 'desconocido',
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        num_documento: persona.num_documento,
        tipo_documento: persona.tipo_documento,
        nombre_p: persona.nombre_p,
        apellido_p: persona.apellido_p,
        rol: persona.rol?.nombre_rol ?? 'desconocido',
      },
    };
  }
}
