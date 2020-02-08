import { StoreConfig, Store } from '@datorama/akita';
import {
  Item,
  PartDefinition,
  PartGroup,
  FacetDefinition,
  FlagDefinition,
  Thesaurus
} from '@cadmus/core';
import { Injectable } from '@angular/core';

/**
 * The state of the currently edited item, if any.
 * This state is set when editing a single item, or any of its parts or
 * part fragments. The app ensures that a new item has been saved before
 * users can edit their parts, so this grants that the edit state is always
 * available when editing parts/fragments.
 * Note that as for any other state, properties "loading" and "error" are
 * implemented inside Akita states, but you must explicitly add the keys
 * to your state (it's an opt-in: see https://github.com/datorama/akita/issues/61).
 */
export interface EditItemState {
  /**
   * The item being edited.
   */
  item: Item | null;
  /**
   * The item's parts, grouped.
   */
  partGroups: PartGroup[] | null;
  /**
   * The facet definition assigned to the item.
   */
  facet: FacetDefinition | null;
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

  dirty?: boolean;
  saving?: boolean;
  deletingPart?: boolean;
  loading?: boolean;
  error?: string;
}

const initialState: EditItemState = {
  item: null,
  partGroups: [],
  facet: null,
  facets: [],
  flags: [],
  typeThesaurus: null,
  dirty: false,
  saving: false,
  deletingPart: false,
  loading: false,
  error: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'edit-item', resettable: true })
export class EditItemStore extends Store<EditItemState> {
  constructor() {
    super(initialState);
  }

  public setDirty(value = true) {
    this.update({
      dirty: value
    });
  }

  public setSaving(value = true) {
    this.update({
      saving: value
    });
  }

  public setDeletingPart(value = true) {
    this.update({
      deletingPart: value
    });
  }
}
