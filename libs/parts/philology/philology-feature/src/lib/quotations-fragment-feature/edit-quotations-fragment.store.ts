import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import {
  EditFragmentState,
  EditFragmentStoreApi,
  editFragmentInitialState,
} from '@cadmus/features/edit-state';
import { QUOTATIONS_FRAGMENT_TYPEID } from '@cadmus/parts/philology/philology-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: QUOTATIONS_FRAGMENT_TYPEID })
export class EditQuotationsFragmentStore extends Store<EditFragmentState>
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
