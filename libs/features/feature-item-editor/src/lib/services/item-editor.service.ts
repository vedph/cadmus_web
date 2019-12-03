import { Injectable } from '@angular/core';
import { ItemStore } from '../state/item.store';

@Injectable({ providedIn: 'root' })
export class ItemEditorService {
  constructor(private _itemStore: ItemStore) {
  }
}
