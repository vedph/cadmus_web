import { Injectable } from '@angular/core';
import { ItemsStore } from '../state/items.store';
import { ItemService } from '@cadmus/api';

@Injectable({ providedIn: 'root' })
export class ItemsListService {
  constructor(
    private _itemsStore: ItemsStore,
    private _itemService: ItemService
  ) {}

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
