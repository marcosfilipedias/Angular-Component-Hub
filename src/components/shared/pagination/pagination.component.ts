import { Component, ChangeDetectionStrategy, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true
})
export class PaginationComponent {
  themeService = inject(ThemeService);

  currentPage = input.required<number>();
  totalItems = input.required<number>();
  itemsPerPage = input.required<number>();
  pageChange = output<number>();

  totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));

  pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2;
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    let l;

    range.push(1);
    for (let i = current - delta; i <= current + delta; i++) {
      if (i >= 2 && i < total) {
        range.push(i);
      }
    }
    if (total > 1) {
        range.push(total);
    }
    
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  });
  
  activePageClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `z-10 bg-${color}-600 text-white shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}-600`;
  });
  
  defaultPageClass = 'text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600 hover:-translate-y-px';
  
  goToPage(page: number | string) {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }
}
