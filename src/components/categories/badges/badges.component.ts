
import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class BadgesComponent {
  themeService = inject(ThemeService);

  badgeClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `bg-${color}-500/20 text-${color}-300`;
  });
  
  dotBadgeClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `text-${color}-400`;
  });
}
