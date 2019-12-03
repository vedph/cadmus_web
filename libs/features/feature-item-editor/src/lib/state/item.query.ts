import { Injectable } from '@angular/core';
import { ItemStore, ItemState } from './item.store';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ItemQuery extends Query<ItemState> {
  constructor(protected store: ItemStore) {
    super(store);
  }
}
