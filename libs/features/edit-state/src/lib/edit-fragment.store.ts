import { Fragment, ThesauriSet } from '@cadmus/core';
import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

export interface EditFragmentState {
  fragment: Fragment | null;
  thesauri: ThesauriSet | null;
  dirty?: boolean;
  saving?: boolean;
  // this is implemented in Akita stores, but you must add the keys
  // https://github.com/datorama/akita/issues/61
  loading?: boolean;
  error?: string;
}

export const editFragmentInitialState: EditFragmentState = {
  fragment: null,
  thesauri: null,
  dirty: false,
  saving: false,
  loading: false,
  error: null
};

/**
 * General-purpose edit-fragment store. This can be used with any fragment,
 * so that you should only provide your fragment store, query, and service
 * (usually extending EditFragmentServiceBase).
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'edit-fragment' })
export class EditFragmentStore extends Store<EditFragmentState> {
  constructor() {
    super(editFragmentInitialState);
  }

  public setDirty(value: boolean) {
    this.update({ dirty: value });
  }

  public setSaving(value: boolean) {
    this.update({ saving: value });
  }
}
