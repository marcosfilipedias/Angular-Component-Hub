
import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ProgressComponent {
  themeService = inject(ThemeService);

  progressFillClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `bg-${color}-600`;
  });

  spinnerColorClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `text-${color}-500`;
  });
}
