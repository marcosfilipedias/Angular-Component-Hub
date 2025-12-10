
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class TooltipsComponent {
  themeService = inject(ThemeService);

  buttonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `bg-${color}-600 hover:bg-${color}-500 text-white font-semibold py-2 px-4 rounded-md`;
  });
}
