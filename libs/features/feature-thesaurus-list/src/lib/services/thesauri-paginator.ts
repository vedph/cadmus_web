import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { ThesauriQuery } from '../state/thesauri.query';

// create a factory provider for the thesauri paginator
export const THESAURI_PAGINATOR = new InjectionToken('THESAURI_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const thesauriQuery = inject(ThesauriQuery);
    return new PaginatorPlugin(thesauriQuery).withControls().withRange();
  }
});
