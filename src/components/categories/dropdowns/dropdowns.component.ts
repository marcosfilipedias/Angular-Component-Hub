
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class DropdownsComponent {
  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(open => !open);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }
}
