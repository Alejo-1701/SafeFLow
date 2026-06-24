import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideDynamicIcon, LucideIcon } from '@lucide/angular';

export interface PortalCardItem {
  readonly title: string;
  readonly description: string;
  readonly actionLabel: string;
  readonly icon: LucideIcon;
  readonly isActive?: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideDynamicIcon],
  selector: 'app-portal-card',
  templateUrl: './portal-card.component.html',
  styleUrl: './portal-card.component.scss',
})
export class PortalCardComponent {
  readonly portal = input.required<PortalCardItem>();
  readonly cardClick = output<PortalCardItem>();
}
