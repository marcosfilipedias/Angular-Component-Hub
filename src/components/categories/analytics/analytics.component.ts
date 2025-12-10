
import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { ProductService, type Product } from '../../../services/product.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class AnalyticsComponent {
  themeService = inject(ThemeService);
  productService = inject(ProductService);

  topProducts = computed(() => this.productService.products().slice(0, 4));

  activityFeed = [
    { user: 'Olivia Martin', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', action: 'added a new product', subject: 'Quantum Wireless Mouse', time: '1h ago' },
    { user: 'Jackson Lee', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', action: 'updated stock for', subject: 'Aero-Street Hoodie', time: '3h ago' },
    { user: 'Isabella Nguyen', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d', action: 'placed an order for', subject: 'Italian Coffee Beans', time: '5h ago' },
    { user: 'William Kim', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', action: 'deactivated the product', subject: 'The Philosophy of Time', time: '1d ago' },
  ];
  
  salesReportData = [
    { month: 'Jan', sales: 650 }, { month: 'Feb', sales: 590 },
    { month: 'Mar', sales: 800 }, { month: 'Apr', sales: 810 },
    { month: 'May', sales: 560 }, { month: 'Jun', sales: 550 },
    { month: 'Jul', sales: 400 }, { month: 'Aug', sales: 500 },
    { month: 'Sep', sales: 600 }, { month: 'Oct', sales: 750 },
    { month: 'Nov', sales: 700 }, { month: 'Dec', sales: 900 },
  ];
  maxSale = computed(() => Math.max(...this.salesReportData.map(d => d.sales)));

  chartBarClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `bg-${color}-500`;
  });

  primaryButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `font-semibold py-2 px-4 rounded-md transition-all duration-200 bg-${color}-600 hover:bg-${color}-500 text-white`;
  });

  getStatusClass(status: string) {
    switch (status) {
      case 'In Stock': return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300';
      case 'Low Stock': return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300';
      case 'Out of Stock': return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  }
}
