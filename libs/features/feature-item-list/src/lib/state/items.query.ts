import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ItemsStore, ItemsState } from './items.store';

@Injectable({ providedIn: 'root' })
export class ItemsQuery extends QueryEntity<ItemsState> {
  constructor(protected _store: ItemsStore) {
    super(_store);
  }
}
