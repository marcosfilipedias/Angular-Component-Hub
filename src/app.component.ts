
import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type Product } from './services/product.service';

// Layout Components
import { TopnavComponent } from './components/topnav/topnav.component';
import { SidebarComponent, Category } from './components/sidebar/sidebar.component';
import { ThemeService } from './services/theme.service';

// Page Components
import { AnalyticsComponent } from './components/categories/analytics/analytics.component';
import { ProductListComponent } from './components/pages/product-list/product-list.component';
import { ProductFormComponent } from './components/pages/product-form/product-form.component';
import { ProductDetailComponent } from './components/pages/product-detail/product-detail.component';

// Shared Components
import { DeleteConfirmModalComponent } from './components/shared/delete-confirm-modal/delete-confirm-modal.component';

// Category Components
import { ButtonsComponent } from './components/categories/buttons/buttons.component';
import { InputsComponent } from './components/categories/inputs/inputs.component';
import { CardsComponent } from './components/categories/cards/cards.component';
import { AlertsComponent } from './components/categories/alerts/alerts.component';
import { ModalsComponent } from './components/categories/modals/modals.component';
import { TablesComponent } from './components/categories/tables/tables.component';
import { DropdownsComponent } from './components/categories/dropdowns/dropdowns.component';
import { NavigationComponent } from './components/categories/navigation/navigation.component';
import { FormsComponent } from './components/categories/forms/forms.component';
import { AccordionComponent } from './components/categories/accordion/accordion.component';
import { BadgesComponent } from './components/categories/badges/badges.component';
import { ChipsComponent } from './components/categories/chips/chips.component';
import { ProgressComponent } from './components/categories/progress/progress.component';
import { StepperComponent } from './components/categories/stepper/stepper.component';
import { TooltipsComponent } from './components/categories/tooltips/tooltips.component';
import { SelectsComponent } from './components/categories/selects/selects.component';
import { CheckboxesComponent } from './components/categories/checkboxes/checkboxes.component';
import { LiquidDashboardComponent } from './components/categories/liquid-dashboard/liquid-dashboard.component';
import { SkeletonsComponent } from './components/categories/skeletons/skeletons.component';

type ViewState = 
  | { page: 'productList' }
  | { page: 'productDetail', id: number }
  | { page: 'productForm', id?: number } // id is optional for 'create' mode
  | { page: Category }; // For component pages

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TopnavComponent,
    SidebarComponent,
    ButtonsComponent,
    InputsComponent,
    CardsComponent,
    AlertsComponent,
    ModalsComponent,
    TablesComponent,
    DropdownsComponent,
    NavigationComponent,
    FormsComponent,
    AccordionComponent,
    BadgesComponent,
    ChipsComponent,
    ProgressComponent,
    StepperComponent,
    TooltipsComponent,
    SelectsComponent,
    CheckboxesComponent,
    AnalyticsComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductDetailComponent,
    DeleteConfirmModalComponent,
    LiquidDashboardComponent,
    SkeletonsComponent
  ]
})
export class AppComponent {
  private themeService = inject(ThemeService);
  
  // App navigation state
  currentView = signal<ViewState>({ page: 'analytics' });
  isSidebarOpen = signal(false);
  
  // Used to pass data to the product form for editing
  productToEdit = computed(() => {
      const view = this.currentView();
      if (view.page === 'productForm' && view.id) {
          // In a real app, you'd fetch this from a service
          return { id: view.id }; 
      }
      return null;
  });

  containerBgClass = computed(() => {
    const color = this.themeService.primaryColor();
    if (color === 'slate') {
      return 'bg-slate-50 dark:bg-slate-950';
    }
    return `bg-${color}-50 dark:bg-slate-950`;
  });

  onCategorySelected(category: Category) {
    if (category === 'products') {
      this.currentView.set({ page: 'productList' });
    } else {
      this.currentView.set({ page: category });
    }
    this.closeSidebar();
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  // --- Product Page Navigation ---
  navigateToShowProduct(id: number) {
    this.currentView.set({ page: 'productDetail', id });
  }

  navigateToProductList() {
    this.currentView.set({ page: 'productList' });
  }

  navigateToCreateProduct() {
    this.currentView.set({ page: 'productForm' });
  }

  navigateToEditProduct(id: number) {
    this.currentView.set({ page: 'productForm', id });
  }

  handleProductSave(product: Product) {
    // In a real app, the service would handle add/update logic
    console.log('Saved product:', product);
    this.navigateToProductList();
  }
}