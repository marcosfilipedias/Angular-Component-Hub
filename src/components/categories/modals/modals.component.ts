
import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ModalsComponent {
  themeService = inject(ThemeService);
  isModalOpen = signal(false);

  primaryButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `inline-flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 bg-${color}-600 hover:bg-${color}-500 text-white focus:ring-${color}-500`;
  });
  
  secondaryButtonClasses = 'inline-flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:ring-slate-500';

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
