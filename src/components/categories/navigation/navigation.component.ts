
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

type Tab = 'My Account' | 'Company' | 'Team Members' | 'Billing';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class NavigationComponent {
  themeService = inject(ThemeService);
  tabs: Tab[] = ['My Account', 'Company', 'Team Members', 'Billing'];
  activeTab = signal<Tab>('My Account');
  
  activeTabClasses = computed(() => {
    const color = this.themeService.primaryColor();
    return `border-${color}-500 text-${color}-600 dark:text-${color}-400`;
  });
  
  inactiveTabClasses = 'border-transparent text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-300';
  
  selectTab(tab: Tab) {
    this.activeTab.set(tab);
  }
}
