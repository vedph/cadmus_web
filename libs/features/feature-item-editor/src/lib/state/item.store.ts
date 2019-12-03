import { StoreConfig, Store } from '@datorama/akita';
import { Item, PartDefinition, PartGroup } from '@cadmus/core';
import { Injectable } from '@angular/core';

export interface ItemState {
  item?: Item;
  facetParts?: PartDefinition[];
  partGroups?: PartGroup[];
}

export const initialState: ItemState = {
  item: null,
  facetParts: [],
  partGroups: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'item' })
export class ItemStore extends Store<ItemState> {
  constructor() {
    super(initialState);
  }
}
