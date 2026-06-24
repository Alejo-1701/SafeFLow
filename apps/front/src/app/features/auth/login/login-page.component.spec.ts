import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render the branding section', async () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Safe');
    expect(compiled.textContent).toContain('Flow');
    expect(compiled.textContent).toContain('Soacha');
  });

  it('should display the login form title and subtitle', async () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Iniciar sesión');
    expect(compiled.textContent).toContain('Bienvenido de nuevo');
  });

  it('should render form fields', async () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('CORREO ELECTRÓNICO');
    expect(compiled.textContent).toContain('CONTRASEÑA');
    expect(compiled.textContent).toContain('Mantener sesión iniciada');
  });

  it('should show a submit button with "Iniciar sesión"', async () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const submitBtn = compiled.querySelector<HTMLButtonElement>(
      '.login-form__submit'
    );
    expect(submitBtn).toBeTruthy();
    expect(submitBtn?.textContent).toContain('Iniciar sesión');
  });

  it('should have a back link to home', async () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const backLink = compiled.querySelector<HTMLAnchorElement>(
      '.login-column__back'
    );
    expect(backLink).toBeTruthy();
    expect(backLink?.textContent?.trim()).toContain('Volver al Inicio');
  });
});
