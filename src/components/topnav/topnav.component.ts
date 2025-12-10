
import { Component, ChangeDetectionStrategy, inject, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ColorPalette } from '../../services/theme.service';
import { ComponentFilterService } from '../../services/component-filter.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class TopnavComponent {
  themeService = inject(ThemeService);
  filterService = inject(ComponentFilterService);
  toggleSidebar = output<void>();

  colors: { name: ColorPalette, class: string }[] = [
    { name: 'slate', class: 'bg-slate-500' },
    { name: 'red', class: 'bg-red-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'amber', class: 'bg-amber-500' },
    { name: 'yellow', class: 'bg-yellow-500' },
    { name: 'lime', class: 'bg-lime-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'emerald', class: 'bg-emerald-500' },
    { name: 'teal', class: 'bg-teal-500' },
    { name: 'cyan', class: 'bg-cyan-500' },
    { name: 'sky', class: 'bg-sky-500' },
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'indigo', class: 'bg-indigo-500' },
    { name: 'violet', class: 'bg-violet-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'fuchsia', class: 'bg-fuchsia-500' },
    { name: 'pink', class: 'bg-pink-500' },
    { name: 'rose', class: 'bg-rose-500' },
  ];
  
  focusRingClass = computed(() => `focus:ring-${this.themeService.primaryColor()}-500`);

  changeTheme(color: ColorPalette) {
    this.themeService.setPrimaryColor(color);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.setSearchTerm(input.value);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
