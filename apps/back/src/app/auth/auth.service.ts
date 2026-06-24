import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Persona } from '../entities/persona.entity';
import { Perfil } from '../entities/perfil.entity';
import { LoginDto, LoginResponse } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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

  async register(dto: RegisterDto): Promise<LoginResponse> {
    const exists = await this.personaRepo.findOne({
      where: { num_documento: dto.num_documento },
    });
    if (exists) {
      throw new ConflictException('El usuario ya existe');
    }

    const persona = this.personaRepo.create({
      num_documento: dto.num_documento,
      tipo_documento: dto.tipo_documento,
      nombre_p: dto.nombre_p,
      nombre_s: dto.nombre_s,
      apellido_p: dto.apellido_p,
      apellido_m: dto.apellido_m,
      rol: { id_rol: dto.id_rol ?? 1 },
    });
    await this.personaRepo.save(persona);

    const hashed = await bcrypt.hash(dto.contrasenia, 10);
    const perfil = this.perfilRepo.create({
      num_documento: dto.num_documento,
      contrasenia: hashed,
    });
    await this.perfilRepo.save(perfil);

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
