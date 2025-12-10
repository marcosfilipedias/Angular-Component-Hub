
import { Component, ChangeDetectionStrategy, input, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFilterService } from '../../services/component-filter.service';
import { ThemeService } from '../../services/theme.service';
import { PdfExportComponent } from '../shared/pdf-export/pdf-export.component';

export type Category = 'analytics' | 'liquid-dashboard' | 'products' | 'buttons' | 'inputs' | 'cards' | 'alerts' | 'modals' | 'tables' | 'dropdowns' | 'navigation' | 'forms' | 'accordion' | 'badges' | 'chips' | 'progress' | 'stepper' | 'tooltips' | 'selects' | 'checkboxes' | 'skeletons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PdfExportComponent]
})
export class SidebarComponent {
  isMobileOpen = input(false);
  selectedCategory = input.required<Category>();
  categorySelected = output<Category>();
  closeSidebar = output<void>();

  private filterService = inject(ComponentFilterService);
  private themeService = inject(ThemeService);
  
  private allCategories: { id: Category, name: string, icon: string, isPage?: boolean }[] = [
    // Pages
    { id: 'analytics', name: 'Analytics', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" /><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 10.5h.008v.008h-.008V10.5z" /><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" /><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197" />', isPage: true },
    { id: 'liquid-dashboard', name: 'Liquid Dashboard', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />', isPage: true },
    { id: 'products', name: 'Products', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />', isPage: true },
    
    // Components
    { id: 'accordion', name: 'Accordion', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.125 1.125 0 010 2.25H5.625a1.125 1.125 0 010-2.25z" />' },
    { id: 'alerts', name: 'Alerts', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />' },
    { id: 'badges', name: 'Badges', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />' },
    { id: 'buttons', name: 'Buttons', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5h7.5v7.5h-7.5z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 15.75h.007v.008H12v-.008z" />' },
    { id: 'cards', name: 'Cards', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />' },
    { id: 'checkboxes', name: 'Checkboxes', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />' },
    { id: 'chips', name: 'Chips', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h13.5m-13.5 7.5h13.5m-13.5-3.75h13.5M3.75 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />' },
    { id: 'dropdowns', name: 'Dropdowns', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />' },
    { id: 'forms', name: 'Forms', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12z" />' },
    { id: 'inputs', name: 'Inputs', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />' },
    { id: 'modals', name: 'Modals', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />' },
    { id: 'navigation', name: 'Navigation', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />' },
    { id: 'progress', name: 'Progress', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.696a4.125 4.125 0 010-5.832M10.209 3.65a4.125 4.125 0 015.582 0" />' },
    { id: 'selects', name: 'Selects', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />' },
    { id: 'skeletons', name: 'Skeletons', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9.75a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h18a.75.75 0 01.75.75zM21.75 13.75a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h18a.75.75 0 01.75.75zM21.75 17.75a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h18a.75.75 0 01.75.75zM4.5 6.25a1.75 1.75 0 11-3.5 0 1.75 1.75 0 013.5 0z" />' },
    { id: 'stepper', name: 'Stepper', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />' },
    { id: 'tables', name: 'Tables', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125V6.375m1.125 13.125A1.125 1.125 0 004.5 18.375h15a1.125 1.125 0 001.125-1.125V6.375m-17.25 13.125A1.125 1.125 0 012.25 18.375V6.375a1.125 1.125 0 011.125-1.125h15a1.125 1.125 0 011.125 1.125v12a1.125 1.125 0 01-1.125 1.125m-17.25 0h.008v.008h-.008v-.008z" />' },
    { id: 'tooltips', name: 'Tooltips', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-1.5 3h1.5m-6.375 3h12.75c1.243 0 2.25-1.007 2.25-2.25V5.25c0-1.243-1.007-2.25-2.25-2.25H5.25c-1.243 0-2.25 1.007-2.25 2.25v13.5c0 1.243 1.007 2.25 2.25 2.25z" />' },
  ];

  pages = computed(() => this.allCategories.filter(c => c.isPage).sort((a, b) => a.name.localeCompare(b.name)));
  components = computed(() => {
    const term = this.filterService.searchTerm();
    const comps = this.allCategories.filter(c => !c.isPage);
    if (!term) {
      return comps.sort((a,b) => a.name.localeCompare(b.name));
    }
    return comps.filter(cat => cat.name.toLowerCase().includes(term));
  });

  activeClass = computed(() => `bg-${this.themeService.primaryColor()}-600 text-white`);
  inactiveClass = 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white';

  selectCategory(category: Category) {
    this.categorySelected.emit(category);
  }

  onClose() {
    this.closeSidebar.emit();
  }
}
