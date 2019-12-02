import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { ItemsQuery } from '../state/items.query';

// create a factory provider for the items paginator
export const ITEMS_PAGINATOR = new InjectionToken('ITEMS_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const itemsQuery = inject(ItemsQuery);
    return new PaginatorPlugin(itemsQuery).withControls().withRange();
  }
});
