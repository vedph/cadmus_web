import { Injectable } from '@angular/core';
import { ItemService } from '@cadmus/api';
import { ItemsSearchStore } from '../state/items-search.store';

@Injectable({ providedIn: 'root' })
export class ItemsSearchService {
  constructor(
    private _itemsStore: ItemsSearchStore,
    private _itemService: ItemService
  ) {}

  public updateQuery(query: string) {
    this._itemsStore.update(state => {
      return {
        ...state,
        query: query
      };
    });
  }

  public delete(id: string) {
    this._itemsStore.setLoading(true);
    this._itemService.deleteItem(id).subscribe(
      _ => {
        this._itemsStore.remove(id);
        this._itemsStore.setLoading(false);
      },
      error => {
        console.error(error);
        this._itemsStore.setLoading(false);
      }
    );
  }
}
