
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ComponentFilterService {
  searchTerm = signal<string>('');

  setSearchTerm(term: string) {
    this.searchTerm.set(term.toLowerCase());
  }
}
