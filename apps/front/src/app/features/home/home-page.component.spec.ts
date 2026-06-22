import { TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
    }).compileComponents();
  });

  it('should render SafeFlow portal modules', async () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Portal Residentes');
    expect(compiled.textContent).toContain('Portal Vigilancia');
    expect(compiled.textContent).toContain('Portal Administracion');
    expect(compiled.textContent).toContain('Portal Propietario');
  });

  it('should show building photo placeholder', async () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Foto del Conjunto Residencial');
  });

  it('should display app header with SafeFlow branding', async () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('SafeFlow');
    expect(compiled.textContent).toContain('Sistema de Gestion Residencial');
  });
});
