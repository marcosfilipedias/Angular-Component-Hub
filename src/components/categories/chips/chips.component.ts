
import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ChipsComponent {
  themeService = inject(ThemeService);
  
  chips = signal(['Angular', 'Tailwind CSS', 'TypeScript']);

  chipBaseClass = 'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium';

  chipThemedClass = computed(() => {
    const color = this.themeService.primaryColor();
    return `bg-${color}-500/20 text-${color}-300`;
  });

  removeChip(chipToRemove: string) {
    this.chips.update(currentChips => currentChips.filter(chip => chip !== chipToRemove));
  }
}
