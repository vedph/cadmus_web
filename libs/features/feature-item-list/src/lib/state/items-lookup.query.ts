import { Injectable } from '@angular/core';
import { ItemsLookupState, ItemsLookupStore, LookupUser } from './items-lookup.store';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ItemsLookupQuery extends Query<ItemsLookupState> {
  constructor(protected store: ItemsLookupStore) {
    super(store);
  }
}
