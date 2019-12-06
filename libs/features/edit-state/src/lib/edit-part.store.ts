import { StoreConfig, Store } from '@datorama/akita';
import { ThesauriSet } from '@cadmus/core';
import { Injectable } from '@angular/core';

export interface EditPartState<T> {
  part: T | null;
  thesauri: ThesauriSet | null;
  dirty?: boolean;
  saving?: boolean,
  // this is implemented in Akita stores, but you must add the keys
  // https://github.com/datorama/akita/issues/61
  loading?: boolean;
  error?: string;
}

const initialEditPartState: EditPartState<any> = {
  part: null,
  thesauri: null,
  dirty: false,
  saving: false,
  loading: false,
  error: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'edit-part' })
export class EditPartStore<T> extends Store<EditPartState<T>> {
  constructor() {
    super(initialEditPartState);
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
