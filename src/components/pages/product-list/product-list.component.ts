
import { Component, ChangeDetectionStrategy, computed, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../../services/product.service';
import { ThemeService } from '../../../services/theme.service';
import { DeleteConfirmModalComponent } from '../../shared/delete-confirm-modal/delete-confirm-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DeleteConfirmModalComponent]
})
export class ProductListComponent {
  productService = inject(ProductService);
  themeService = inject(ThemeService);

  // Outputs for navigation
  addProduct = output<void>();
  editProduct = output<number>();
  viewProduct = output<number>();

  // State for delete confirmation
  isDeleteModalOpen = signal(false);
  productToDelete = signal<Product | null>(null);

  products = this.productService.products;

  primaryButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `inline-flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-md transition-all duration-200 bg-${color}-600 hover:bg-${color}-500 text-white`;
  });

  editButtonClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `font-medium text-${color}-600 dark:text-${color}-500 hover:underline`;
  });

  getStatusClass(status: string) {
    switch (status) {
      case 'In Stock': return 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300';
      case 'Low Stock': return 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300';
      case 'Out of Stock': return 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  }

  // --- Event Handlers ---
  onAddNewProduct() {
    this.addProduct.emit();
  }

  onEditProduct(id: number) {
    this.editProduct.emit(id);
  }
  
  onViewProduct(id: number) {
    this.viewProduct.emit(id);
  }

  openDeleteModal(product: Product) {
    this.productToDelete.set(product);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.productToDelete.set(null);
  }

  confirmDelete() {
    const product = this.productToDelete();
    if (product) {
      this.productService.deleteProduct(product.id);
    }
    this.closeDeleteModal();
  }
}
