import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  selector: 'app-propietario-page',
  template: ` <div class="prop-shell"><p>Portal Propietario</p></div> `,
  styles: [
    `
      :host { display: block; min-height: 100vh; background: #101a2a; }
      .prop-shell { display: flex; align-items: center; justify-content: center; min-height: 100vh; color: rgba(255,255,255,0.4); font-size: 1rem; }
    `,
  ],
})
export class PropietarioPageComponent {}
