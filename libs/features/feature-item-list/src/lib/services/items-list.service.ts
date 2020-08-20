import { Injectable } from '@angular/core';
import { ItemsStore } from '../state/items.store';
import { ItemService } from '@cadmus/api';

@Injectable({ providedIn: 'root' })
export class ItemsListService {
  constructor(
    private _itemsStore: ItemsStore,
    private _itemService: ItemService
  ) {}

  public delete(id: string): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      this._itemsStore.setLoading(true);

      this._itemService.deleteItem(id).subscribe(
        (_) => {
          this._itemsStore.remove(id);
          this._itemsStore.setLoading(false);
          resolve(true);
        },
        (error) => {
          console.error(error);
          this._itemsStore.setLoading(false);
          reject(error);
        }
      );
    });
    return promise;
  }
}
