import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Persona } from '../entities/persona.entity';
import { Perfil } from '../entities/perfil.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Persona, Perfil]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'safeflow-secret-key',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
