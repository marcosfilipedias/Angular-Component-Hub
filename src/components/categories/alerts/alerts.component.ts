
import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class AlertsComponent {
  themeService = inject(ThemeService);

  infoAlertClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return {
      container: `bg-${color}-50 dark:bg-${color}-900/50 border border-${color}-200 dark:border-${color}-700 text-${color}-700 dark:text-${color}-300`,
      icon: `text-${color}-500 dark:text-${color}-400`,
      title: `text-${color}-800 dark:text-${color}-200`
    };
  });
}
