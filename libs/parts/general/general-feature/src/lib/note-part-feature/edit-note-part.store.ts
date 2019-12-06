import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import {
  EditPartState,
  EditPartStoreApi,
  editPartInitialState
} from '@cadmus/features/edit-state';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'net.fusisoft.note' })
export class EditNotePartStore extends Store<EditPartState>
  implements EditPartStoreApi {
  constructor() {
    super(editPartInitialState);
  }

  setDirty(value: boolean): void {
    this.update({ dirty: value });
  }
  setSaving(value: boolean): void {
    this.update({ saving: value });
  }
}
