import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import {
  EditFragmentState,
  EditFragmentStoreApi,
  editFragmentInitialState
} from '@cadmus/features/edit-state';
import { CHRONOLOGY_FRAGMENT_TYPEID } from '@cadmus/parts/general/general-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: CHRONOLOGY_FRAGMENT_TYPEID })
export class EditChronologyFragmentStore extends Store<EditFragmentState>
  implements EditFragmentStoreApi {
  constructor() {
    super(editFragmentInitialState);
  }

  public setDirty(value: boolean): void {
    this.update({ dirty: value });
  }
  public setSaving(value: boolean): void {
    this.update({ saving: value });
  }
}
