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
import { ThesaurusService } from '@cadmus/api';

/**
 * The state of the currently edited item, if any.
 * This state is set when editing a single item, or any of its parts or
 * part fragments.
 */
export interface EditItemState {
  item: Item | null;
  partGroups: PartGroup[] | null;
  // lookup data
  facetParts: PartDefinition[] | null;
  facets: FacetDefinition[] | null;
  flags: FlagDefinition[] | null;
  typeThesaurus: Thesaurus | null;
  dirty?: boolean;
  saving?: boolean;
  deletingPart?: boolean;
  // this is implemented in Akita stores, but you must add the keys
  // https://github.com/datorama/akita/issues/61
  loading?: boolean;
  error?: string;
}

const initialState: EditItemState = {
  item: null,
  partGroups: [],
  facetParts: [],
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
