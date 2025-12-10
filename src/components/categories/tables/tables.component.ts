
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

interface User {
  name: string;
  title: string;
  role: 'Admin' | 'Owner' | 'Member';
  email: string;
  status: 'Active' | 'Inactive';
  team: string;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PaginationComponent]
})
export class TablesComponent {
  themeService = inject(ThemeService);

  // --- Basic Table Data ---
  users: User[] = [
    { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com', status: 'Active', team: 'Optimization' },
    { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com', status: 'Active', team: 'Intranet' },
    { name: 'Esther Howard', title: 'Forward Response Developer', role: 'Member', email: 'esther.howard@example.com', status: 'Inactive', team: 'Directives' },
    { name: 'Jenny Wilson', title: 'Central Security Manager', role: 'Member', email: 'jenny.wilson@example.com', status: 'Active', team: 'Program' },
    { name: 'Kristin Watson', title: 'Lead Implementation Liaison', role: 'Admin', email: 'kristin.watson@example.com', status: 'Active', team: 'Mobility' },
    { name: 'Cameron Williamson', title: 'Internal Applications Engineer', role: 'Member', email: 'cameron.williamson@example.com', status: 'Inactive', team: 'Web Security' },
    { name: 'Robert Fox', title: 'Senior Interactions Designer', role: 'Member', email: 'robert.fox@example.com', status: 'Active', team: 'Design' },
    { name: 'Jacob Jones', title: 'Principal Data Analyst', role: 'Admin', email: 'jacob.jones@example.com', status: 'Active', team: 'Analytics' },
    { name: 'Darlene Robertson', title: 'Legacy Brand Strategist', role: 'Member', email: 'darlene.robertson@example.com', status: 'Inactive', team: 'Marketing' },
  ];

  // --- Advanced Table State ---
  searchTerm = signal('');
  sortConfig = signal<{ key: keyof User; direction: 'asc' | 'desc' } | null>({ key: 'name', direction: 'asc' });
  currentPage = signal(1);
  itemsPerPage = signal(5);
  isUpdating = signal(false);

  // --- Computed Data for Advanced Table ---
  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.users;
    return this.users.filter(user => 
      Object.values(user).some(val => 
        String(val).toLowerCase().includes(term)
      )
    );
  });

  sortedUsers = computed(() => {
    const config = this.sortConfig();
    const data = [...this.filteredUsers()];
    if (!config) return data;
    
    return data.sort((a, b) => {
      const aVal = a[config.key];
      const bVal = b[config.key];
      if (aVal < bVal) return config.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return config.direction === 'asc' ? 1 : -1;
      return 0;
    });
  });

  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.sortedUsers().slice(start, end);
  });

  totalItems = computed(() => this.filteredUsers().length);
  
  focusRingClass = computed(() => `focus:ring-${this.themeService.primaryColor()}-500`);

  // --- Methods for Advanced Table ---
  private async handleDataUpdate(updateFn: () => void) {
    if (this.isUpdating()) return;

    this.isUpdating.set(true);
    
    // Duration for the fade-out effect.
    await new Promise(resolve => setTimeout(resolve, 150));

    updateFn(); // Data changes here, while the UI is faded out.
    
    // Trigger the fade-in effect.
    this.isUpdating.set(false);
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.handleDataUpdate(() => {
      this.searchTerm.set(value);
      this.currentPage.set(1); // Reset to first page on search
    });
  }

  requestSort(key: keyof User) {
    this.handleDataUpdate(() => {
      let direction: 'asc' | 'desc' = 'asc';
      const currentConfig = this.sortConfig();
      if (currentConfig && currentConfig.key === key && currentConfig.direction === 'asc') {
        direction = 'desc';
      }
      this.sortConfig.set({ key, direction });
      this.currentPage.set(1); // Reset to first page on sort
    });
  }
  
  onPageChange(page: number) {
     this.handleDataUpdate(() => {
      this.currentPage.set(page);
    });
  }
}
