import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { ItemsSearchQuery } from '../state/items-search.query';

// create a factory provider for the items paginator
export const ITEMS_SEARCH_PAGINATOR = new InjectionToken(
  'ITEMS_SEARCH_PAGINATOR',
  {
    providedIn: 'root',
    factory: () => {
      const itemsSearchQuery = inject(ItemsSearchQuery);
      return new PaginatorPlugin(itemsSearchQuery).withControls().withRange();
    }
  }
);
