import { StoreConfig, Store } from '@datorama/akita';
import { PartDefinition, TokenTextLayerPart } from '@cadmus/core';
import { Injectable } from '@angular/core';
import { RolePartId } from '@cadmus/api';

export const TOKEN_TEXT_PART_TYPEID = 'net.fusisoft.token-text';

/**
 * The state of the currently edited token-based text layer part, if any.
 * This state is set when editing a token-based text layer.
 */
export interface EditTokenLayerPartState {
  /**
   * The layer part being edited.
   */
  part: TokenTextLayerPart | null;
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
}

const initialState: EditTokenLayerPartState = {
  part: null,
  baseText: null,
  layers: null,
  selectedLayer: null,
  rolePartIds: null,
  loading: false,
  error: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'edit-item' })
export class EditTokenLayerPartStore extends Store<EditTokenLayerPartState> {
  constructor() {
    super(initialState);
  }
}
