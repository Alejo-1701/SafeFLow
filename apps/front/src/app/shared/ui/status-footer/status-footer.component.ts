import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-status-footer',
  templateUrl: './status-footer.component.html',
  styleUrl: './status-footer.component.scss',
})
export class StatusFooterComponent {}
