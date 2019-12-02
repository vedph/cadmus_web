import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { ItemInfo } from '@cadmus/core';
import { Injectable } from '@angular/core';

export interface ItemsState extends EntityState<ItemInfo, string> {
  // TODO: add filters
}

const initialState = {
  // TODO: add filters
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'items' })
export class ItemsStore extends EntityStore<ItemsState> {
  constructor() {
    super(initialState);
  }
}
