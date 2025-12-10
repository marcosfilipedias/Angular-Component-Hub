
import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class CardsComponent {
  themeService = inject(ThemeService);

  cardBorderClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `border-t-4 border-${color}-500`;
  });

  buttonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `inline-block bg-${color}-600 hover:bg-${color}-500 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200`;
  });
}
