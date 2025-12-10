
import { Component, ChangeDetectionStrategy, computed, inject, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product, ProductCategory, ProductStatus } from '../../../services/product.service';
import { ThemeService } from '../../../services/theme.service';

const NEW_PRODUCT_TEMPLATE: Omit<Product, 'id'> = {
    name: '',
    description: '',
    price: 0,
    category: 'Electronics',
    status: 'In Stock',
    imageUrl: '',
    tags: [],
    featured: false,
};

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ProductFormComponent {
  productService = inject(ProductService);
  themeService = inject(ThemeService);

  // Inputs & Outputs
  productId = input<number | undefined>();
  save = output<Product>();
  cancel = output<void>();

  productState = signal<Omit<Product, 'id'> | Product>(NEW_PRODUCT_TEMPLATE);
  isEditMode = computed(() => this.productId() !== undefined);
  pageTitle = computed(() => (this.isEditMode() ? 'Edit Product' : 'Create New Product'));

  // Form options
  categories: ProductCategory[] = ['Electronics', 'Apparel', 'Groceries', 'Books', 'Home Goods'];
  statuses: ProductStatus[] = ['In Stock', 'Low Stock', 'Out of Stock'];

  constructor() {
    effect(() => {
        const id = this.productId();
        if (id) {
            const existingProduct = this.productService.getProduct(id);
            if (existingProduct) {
                this.productState.set({ ...existingProduct });
            }
        } else {
            this.productState.set(JSON.parse(JSON.stringify(NEW_PRODUCT_TEMPLATE)));
        }
    });
  }

  // --- Computed Classes ---
  baseInputClass = 'block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none';

  focusClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `focus:ring-2 focus:ring-${color}-500 focus:border-${color}-500`;
  });

  inputClasses = computed(() => `${this.baseInputClass} ${this.focusClasses()}`);

  toggleBgClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `peer-checked:bg-${color}-600`;
  });

  primaryButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `font-semibold py-2 px-4 rounded-md transition-all duration-200 bg-${color}-600 hover:bg-${color}-500 text-white`;
  });

  secondaryButtonClasses = 'font-semibold py-2 px-4 rounded-md transition-all duration-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100';


  // --- Methods ---
  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    const currentState = this.productState();
    if (this.isEditMode()) {
        this.productService.updateProduct(currentState as Product);
    } else {
        this.productService.addProduct(currentState);
    }
    // In a real app, the parent component would receive the saved product data
    // For this demo, we can just navigate back after the service is updated.
    this.cancel.emit(); 
  }

  updateField<K extends keyof Product>(field: K, value: Product[K]) {
    this.productState.update(p => ({ ...p, [field]: value }));
  }

  onTagsChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    this.updateField('tags', tags);
  }
}
