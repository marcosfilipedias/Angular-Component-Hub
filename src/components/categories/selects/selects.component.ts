
import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-selects',
  templateUrl: './selects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class SelectsComponent {
  themeService = inject(ThemeService);
  readonly MAX_VISIBLE_CHIPS = 2;

  // --- Options Data ---
  frameworks = ['React', 'Angular', 'Vue', 'Svelte', 'Solid', 'Qwik'];
  allMultiOptions = ['Angular', 'Tailwind CSS', 'TypeScript', 'Vite', 'RxJS', 'Signals', 'NgRx', 'Standalone'];
  allCountries = [ 'United States', 'Canada', 'Mexico', 'Brazil', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia', 'India', 'China', 'Russia', 'South Africa' ];

  // --- Basic Select State ---
  isBasicOpen = signal(false);
  selectedFramework = signal<string>('Angular');

  // --- Multi-select State ---
  isMultiOpen = signal(false);
  selectedMultiOptions = signal<string[]>(['Angular', 'Tailwind CSS', 'TypeScript']);
  visibleMultiOptions = computed(() => this.selectedMultiOptions().slice(0, this.MAX_VISIBLE_CHIPS));
  hiddenMultiOptionsCount = computed(() => this.selectedMultiOptions().length - this.visibleMultiOptions().length);


  // --- Searchable Select State ---
  isSearchableOpen = signal(false);
  selectedCountry = signal<string | null>(null);
  searchTerm = signal('');

  filteredCountries = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.allCountries;
    return this.allCountries.filter(country => country.toLowerCase().includes(term));
  });

  // --- Computed Styles ---
  activeOptionClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `bg-${color}-600 text-white`;
  });

  checkboxClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `h-4 w-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-${color}-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-${color}-500`;
  });

  chipThemedClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `bg-${color}-500/20 text-${color}-300`;
  });

  focusRingClass = computed(() => `focus:ring-${this.themeService.primaryColor()}-500`);

  // --- Methods ---
  toggleBasic() { this.isBasicOpen.update(v => !v); }
  selectFramework(fw: string) {
    this.selectedFramework.set(fw);
    this.isBasicOpen.set(false);
  }

  toggleMulti() { this.isMultiOpen.update(v => !v); }
  toggleMultiOption(option: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.selectedMultiOptions.update(selected => {
      if (checkbox.checked) {
        return [...selected, option];
      } else {
        return selected.filter(item => item !== option);
      }
    });
  }
  removeMultiOption(option: string) {
    this.selectedMultiOptions.update(selected => selected.filter(item => item !== option));
  }

  toggleSearchable() {
    this.isSearchableOpen.update(v => !v);
    if(this.isSearchableOpen()) {
        this.searchTerm.set(''); // Reset search on open
    }
  }
  selectCountry(country: string) {
    this.selectedCountry.set(country);
    this.isSearchableOpen.set(false);
  }
  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}
