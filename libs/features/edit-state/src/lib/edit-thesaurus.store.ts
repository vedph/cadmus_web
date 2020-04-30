import { Thesaurus } from '@cadmus/core';
import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

export interface EditThesaurusState {
  thesaurus: Thesaurus | null;

  dirty?: boolean;
  saving?: boolean;
  loading?: boolean;
  error?: string;
}

const initialState: EditThesaurusState = {
  thesaurus: null,
  dirty: false,
  saving: false,
  loading: false,
  error: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'edit-thesaurus', resettable: true })
export class EditThesaurusStore extends Store<EditThesaurusState> {
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
}
