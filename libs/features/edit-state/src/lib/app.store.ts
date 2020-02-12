import { FacetDefinition, FlagDefinition, Thesaurus } from '@cadmus/core';
import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

/**
 * General app state, mostly filled with lookup data which can be assumed
 * not to change in the whole session.
 */
export interface AppState {
  /**
   * All the available facets definitions.
   */
  facets: FacetDefinition[] | null;
  /**
   * All the available flags definitions.
   */
  flags: FlagDefinition[] | null;
  /**
   * The thesaurus for model-types. This (if present) is used to display
   * human-friendly part types names from their IDs. Otherwise, the raw
   * IDs are displayed.
   */
  typeThesaurus: Thesaurus | null;

  loading?: boolean;
  error?: string;
}

const initialState: AppState = {
  facets: [],
  flags: [],
  typeThesaurus: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app', resettable: false })
export class AppStore extends Store<AppState> {
  constructor() {
    super(initialState);
  }
}
