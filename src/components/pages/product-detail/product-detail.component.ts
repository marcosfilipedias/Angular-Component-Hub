
import { Component, ChangeDetectionStrategy, computed, inject, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product, ProductStatus } from '../../../services/product.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ProductDetailComponent {
  productService = inject(ProductService);
  themeService = inject(ThemeService);

  // Inputs & Outputs
  productId = input.required<number>();
  editProduct = output<number>();
  backToList = output<void>();

  product = signal<Product | undefined>(undefined);

  constructor() {
    effect(() => {
        const id = this.productId();
        this.product.set(this.productService.getProduct(id));
    });
  }

  primaryButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `font-semibold py-2 px-4 rounded-md transition-all duration-200 bg-${color}-600 hover:bg-${color}-500 text-white`;
  });

  secondaryButtonClasses = 'font-semibold py-2 px-4 rounded-md transition-all duration-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100';
  
  chipClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `bg-${color}-100 text-${color}-800 dark:bg-${color}-900/50 dark:text-${color}-300`;
  });
  
  getStatusClass(status: ProductStatus) {
    switch (status) {
      case 'In Stock': return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300';
      case 'Low Stock': return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300';
      case 'Out of Stock': return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300';
      default: return '';
    }
  }

  onBack() {
    this.backToList.emit();
  }

  onEdit() {
    this.editProduct.emit(this.productId());
  }
}
