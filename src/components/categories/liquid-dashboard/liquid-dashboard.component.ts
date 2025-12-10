import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { ProductService, type Product } from '../../../services/product.service';

@Component({
  selector: 'app-liquid-dashboard',
  templateUrl: './liquid-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class LiquidDashboardComponent {
  themeService = inject(ThemeService);
  productService = inject(ProductService);

  topProducts = computed(() => this.productService.products().slice(0, 4));
  
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
    const theme = this.themeService.theme();
    return theme === 'light' ? `bg-${color}-400` : `bg-${color}-500`;
  });

  gradientBlobClass = computed(() => {
    const color = this.themeService.primaryColor();
    const theme = this.themeService.theme();
     if (color === 'slate') {
        return theme === 'light' ? 'from-slate-200 to-gray-200' : 'from-slate-500 to-gray-500';
    }
    return theme === 'light' 
      ? `from-${color}-200 to-purple-200` 
      : `from-${color}-500 to-purple-500`;
  });

  gradientBlob2Class = computed(() => {
    const theme = this.themeService.theme();
    return theme === 'light'
      ? 'from-cyan-200 to-sky-200'
      : 'from-cyan-400 to-sky-500';
  });
  
  gradientBlob3Class = computed(() => {
    const theme = this.themeService.theme();
    return theme === 'light'
      ? 'from-amber-200 to-orange-200'
      : 'from-amber-400 to-orange-500';
  });

  gradientBlob4Class = computed(() => {
    const theme = this.themeService.theme();
    return theme === 'light'
      ? 'from-pink-200 to-rose-200'
      : 'from-pink-500 to-rose-500';
  });


  primaryButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `font-semibold py-2 px-4 rounded-xl transition-all duration-300 bg-white/20 dark:bg-slate-800/30 backdrop-blur-lg text-slate-800 dark:text-slate-100 border border-white/30 dark:border-slate-700/50 shadow-md hover:bg-white/40 dark:hover:bg-slate-800/60 hover:shadow-lg`;
  });

  getStatusClass(status: string) {
    switch (status) {
      case 'In Stock': return 'bg-green-500/20 text-green-300';
      case 'Low Stock': return 'bg-amber-500/20 text-amber-300';
      case 'Out of Stock': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  }
}
