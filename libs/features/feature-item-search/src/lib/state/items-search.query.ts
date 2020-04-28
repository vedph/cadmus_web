import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ItemsSearchStore, ItemsSearchState } from './items-search.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemsSearchQuery extends QueryEntity<ItemsSearchState> {
  constructor(protected store: ItemsSearchStore) {
    super(store);
  }

  public selectQuery(): Observable<string> {
    return this.select(state => state.query);
  }

  public selectLastQueries(): Observable<string[]> {
    return this.select(state => state.lastQueries);
  }

  /**
   * Remove the item with the specified ID from the store.
   * @param id The item's ID.
   */
  public delete(id: string) {
    this.store.remove(id);
  }
}
