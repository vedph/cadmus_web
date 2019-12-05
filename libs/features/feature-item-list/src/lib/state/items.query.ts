import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ItemsStore, ItemsState } from './items.store';

@Injectable({ providedIn: 'root' })
export class ItemsQuery extends QueryEntity<ItemsState> {
  constructor(protected store: ItemsStore) {
    super(store);
  }

  /**
   * Remove the item with the specified ID from the store.
   * @param id The item's ID.
   */
  public delete(id: string) {
    this.store.remove(id);
  }
}
