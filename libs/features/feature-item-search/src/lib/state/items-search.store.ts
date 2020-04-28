import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { ItemInfo } from '@cadmus/core';
import { Injectable } from '@angular/core';

export interface ItemsSearchState extends EntityState<ItemInfo, string> {
  query: string;
  lastQueries: string[];
}

const initialState = {
  query: null,
  lastQueries: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'items-search' })
export class ItemsSearchStore extends EntityStore<ItemsSearchState> {
  constructor() {
    super(initialState);
  }
}
