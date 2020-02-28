import { StoreConfig, Store } from '@datorama/akita';
import {
  Item,
  PartGroup,
  FacetDefinition,
  LayerPartInfo,
  Part
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
   * The raw list of item's parts.
   */
  parts: Part[] | null;
  /**
   * The item's parts, grouped.
   */
  partGroups: PartGroup[] | null;
  /**
   * The set of all the possible layer parts for this item, either
   * present or absent.
   */
  layerPartInfos: LayerPartInfo[] | null;
  /**
   * The facet definition assigned to the item.
   */
  facet: FacetDefinition | null;

  dirty?: boolean;
  saving?: boolean;
  deletingPart?: boolean;
  loading?: boolean;
  error?: string;
}

const initialState: EditItemState = {
  item: null,
  parts: [],
  partGroups: [],
  layerPartInfos: [],
  facet: null,
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
