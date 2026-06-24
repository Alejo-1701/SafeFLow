import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  num_documento: string;

  @IsString()
  @MinLength(4)
  contrasenia: string;
}

export interface LoginResponse {
  access_token: string;
  usuario: {
    num_documento: string;
    tipo_documento: string;
    nombre_p: string;
    apellido_p: string;
    rol: string;
  };
}
