import { StoreConfig, Store } from '@datorama/akita';
import { FacetDefinition, FlagDefinition, UserInfo } from '@cadmus/core';
import { Injectable } from '@angular/core';

export interface LookupUser {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ItemsLookupState {
  facets: FacetDefinition[];
  flags: FlagDefinition[];
  users: LookupUser[];
}

const initialState = {
  facets: [],
  flags: [],
  users: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'items-lookup' })
export class ItemsLookupStore extends Store<ItemsLookupState> {
  constructor() {
    super(initialState);
  }
}
