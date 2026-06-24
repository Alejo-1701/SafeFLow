import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import {
  LucideArrowLeft,
  LucideArrowRight,
  LucideEye,
  LucideEyeOff,
  LucideLockKeyhole,
  LucideMail,
  LucideMapPin,
} from '@lucide/angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LucideArrowLeft,
    LucideArrowRight,
    LucideEye,
    LucideEyeOff,
    LucideLockKeyhole,
    LucideMail,
    LucideMapPin,
  ],
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected showPassword = false;

  protected togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/portal/residente';
    this.router.navigate([redirect]);
  }
}
