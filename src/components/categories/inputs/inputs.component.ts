
import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class InputsComponent {
  themeService = inject(ThemeService);

  baseInputClass = 'block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none disabled:bg-slate-100 dark:disabled:bg-slate-700 disabled:cursor-not-allowed';

  focusClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `focus:ring-${color}-500 focus:border-${color}-500`;
  });

  inputClasses = computed(() => {
    return `${this.baseInputClass} ${this.focusClasses()}`;
  });

  validInputClasses = computed(() => {
    return `${this.baseInputClass} border-green-500 focus:ring-green-500 focus:border-green-500`;
  });

  invalidInputClasses = computed(() => {
    return `${this.baseInputClass} border-red-500 focus:ring-red-500 focus:border-red-500`;
  });

  toggleBgClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `peer-checked:bg-${color}-600`;
  });
}
