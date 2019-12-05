import { StoreConfig, Store } from '@datorama/akita';
import { Item, PartDefinition, PartGroup, FacetDefinition, FlagDefinition } from '@cadmus/core';
import { Injectable } from '@angular/core';

/**
 * Item editor state. This includes the item itself, plus its parts grouped
 * according to their metadata (partGroups), and lookup data for available
 * parts definitions, facets definitions, and flags definitions. The available
 * parts definitions are derived from merging all the parts definitions from
 * each facet. This should provide a list of all the parts types available
 * for an item.
 */
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
