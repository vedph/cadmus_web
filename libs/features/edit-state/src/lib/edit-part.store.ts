import { ThesauriSet, Part } from '@cadmus/core';
import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

export interface EditPartState {
  part: Part | null;
  thesauri: ThesauriSet | null;
  dirty?: boolean;
  saving?: boolean;
  // this is implemented in Akita stores, but you must add the keys
  // https://github.com/datorama/akita/issues/61
  loading?: boolean;
  error?: string;
}

export const editPartInitialState: EditPartState = {
  part: null,
  thesauri: null,
  dirty: false,
  saving: false,
  loading: false,
  error: null
};

/**
 * General-purpose edit-part store. This can be used with any part, so that
 * you should only provide your part store, query, and service (usually
 * extending EditPartServiceBase).
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'edit-part' })
export class EditPartStore extends Store<EditPartState> {
  constructor() {
    super(editPartInitialState);
  }

  public setDirty(value: boolean) {
    this.update({ dirty: value });
  }

  public setSaving(value: boolean) {
    this.update({ saving: value });
  }
}
