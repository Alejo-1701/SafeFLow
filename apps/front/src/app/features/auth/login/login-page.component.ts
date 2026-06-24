import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  LucideArrowLeft,
  LucideArrowRight,
  LucideEye,
  LucideEyeOff,
  LucideLockKeyhole,
  LucideUser,
  LucideMapPin,
  LucideAlertCircle,
} from '@lucide/angular';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LucideArrowLeft,
    LucideArrowRight,
    LucideEye,
    LucideEyeOff,
    LucideLockKeyhole,
    LucideUser,
    LucideMapPin,
    LucideAlertCircle,
  ],
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected showPassword = false;
  protected loading = signal(false);
  protected error = signal<string | null>(null);

  protected togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const documento = formData.get('documento') as string;
    const contrasenia = formData.get('contrasenia') as string;

    if (!documento || !contrasenia) {
      this.error.set('Por favor ingresa tu número de documento y contraseña');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.authService.login(documento, contrasenia).subscribe({
      next: (res) => {
        this.loading.set(false);
        const roleMap: Record<string, string> = {
          residente: '/portal/residente',
          vigilancia: '/portal/vigilancia',
          administrador: '/portal/administracion',
          propietario: '/portal/propietario',
        };
        const path = roleMap[res.usuario.rol.toLowerCase()] || '/';
        this.router.navigate([path]);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        if (err.status === 401) {
          this.error.set('Credenciales inválidas. Verifica tu documento y contraseña.');
        } else {
          this.error.set('Error de conexión. Intenta de nuevo más tarde.');
        }
      },
    });
  }
}
