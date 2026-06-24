import { IsString, IsOptional, IsNumber, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  num_documento: string;

  @IsString()
  tipo_documento: string;

  @IsString()
  nombre_p: string;

  @IsOptional()
  @IsString()
  nombre_s?: string;

  @IsString()
  apellido_p: string;

  @IsString()
  apellido_m: string;

  @IsOptional()
  @IsNumber()
  id_rol?: number;

  @IsString()
  @MinLength(6)
  contrasenia: string;
}
