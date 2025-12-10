
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ButtonsComponent {
  themeService = inject(ThemeService);

  baseButtonClass = 'inline-flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed';
  
  primaryButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `${this.baseButtonClass} bg-${color}-600 hover:bg-${color}-500 text-white focus:ring-${color}-500`;
  });

  secondaryButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `${this.baseButtonClass} bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100 focus:ring-slate-500`;
  });
  
  outlineButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `${this.baseButtonClass} bg-transparent border-2 border-${color}-500 text-${color}-500 dark:text-${color}-400 hover:bg-${color}-500 hover:text-white focus:ring-${color}-500`;
  });

  ghostButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `${this.baseButtonClass} bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-${color}-500 dark:hover:text-${color}-400 focus:ring-${color}-500`;
  });
}
