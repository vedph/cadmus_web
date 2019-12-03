import { StoreConfig, Store } from '@datorama/akita';
import { Item, PartDefinition, PartGroup, FacetDefinition, FlagDefinition } from '@cadmus/core';
import { Injectable } from '@angular/core';

export interface ItemState {
  item?: Item;
  partGroups?: PartGroup[];
  // lookup data
  facetParts?: PartDefinition[];
  facets?: FacetDefinition[];
  flags?: FlagDefinition[];
  // UI
  // this is implemented in Akita stores, but you must add the keys
  // https://github.com/datorama/akita/issues/61
  loading?: boolean;
  error?: string;
}

export const initialState: ItemState = {
  item: null,
  partGroups: [],
  facetParts: [],
  facets: [],
  flags: [],
  loading: false,
  error: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'item' })
export class ItemStore extends Store<ItemState> {
  constructor() {
    super(initialState);
  }
}
