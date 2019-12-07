import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import {
  EditPartState,
  EditPartStoreApi,
  editPartInitialState
} from '@cadmus/features/edit-state';
import { NOTE_PART_TYPEID } from '@cadmus/parts/general/general-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: NOTE_PART_TYPEID })
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
