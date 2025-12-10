
import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ColorPalette = 'slate' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';
export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  primaryColor = signal<ColorPalette>('indigo');
  theme = signal<Theme>('dark');
  
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(savedTheme || (prefersDark ? 'dark' : 'light'));
    }

    effect(() => {
      const currentTheme = this.theme();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('theme', currentTheme);
        if (currentTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }

  setPrimaryColor(color: ColorPalette) {
    this.primaryColor.set(color);
  }

  toggleTheme() {
    this.theme.update(current => (current === 'dark' ? 'light' : 'dark'));
  }
}
