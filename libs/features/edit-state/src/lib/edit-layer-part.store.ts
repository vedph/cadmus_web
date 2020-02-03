import { StoreConfig, Store } from '@datorama/akita';
import { PartDefinition, TextLayerPart } from '@cadmus/core';
import { Injectable } from '@angular/core';
import { RolePartId } from '@cadmus/api';

/**
 * The state of the currently edited text layer part, if any.
 * This state is set when editing a text layer.
 */
export interface EditLayerPartState {
  /**
   * The layer part being edited.
   */
  part: TextLayerPart | null;
  /**
   * The base text.
   */
  baseText: string | null;
  /**
   * The available layer parts.
   */
  layers: PartDefinition[] | null;
  /**
   * The currently selected layer part.
   */
  selectedLayer: PartDefinition | null;
  /**
   * A list of layer parts IDs and role IDs for the edited item.
   * Note that the role IDs for layer parts may just be equal to the fragment
   * type ID (e.g. "fr.net.fusisoft.comment"), or include this + dot + role ID
   * proper (e.g."fr.net.fusisoft.comment:scholarly").
   * This list allows to retrieve the ID of the layer part to be loaded
   * from its role (i.e. its layer type).
   */
  rolePartIds: RolePartId[] | null;
  // this is implemented in Akita stores, but you must add the keys
  // https://github.com/datorama/akita/issues/61
  loading?: boolean;
  error?: string;
  deletingFragment?: boolean;
  savingFragment?: boolean;
}

const initialState: EditLayerPartState = {
  part: null,
  baseText: null,
  layers: null,
  selectedLayer: null,
  rolePartIds: null,
  loading: false,
  error: null,
  deletingFragment: false,
  savingFragment: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'edit-token-layer-part' })
export class EditLayerPartStore extends Store<EditLayerPartState> {
  constructor() {
    super(initialState);
  }

  public setDeletingFragment(value = true) {
    this.update({ deletingFragment: value });
  }

  public setSavingFragment(value = true) {
    this.update({ savingFragment: value });
  }
}
