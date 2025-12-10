
import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class CheckboxesComponent {
  themeService = inject(ThemeService);

  checkboxClasses = computed(() => {
    const color = this.themeService.primaryColor();
    // The text color class styles the checkmark icon and background when the checkbox is checked.
    return `h-4 w-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-${color}-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-${color}-500`;
  });

  disabledCheckboxClasses = 'h-4 w-4 rounded border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 cursor-not-allowed';
}
