import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import {
  EditPartState,
  EditPartStoreApi,
  editPartInitialState
} from '@cadmus/features/edit-state';
import { HISTORICAL_DATE_PART_TYPEID } from '@cadmus/parts/general/general-ui';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: HISTORICAL_DATE_PART_TYPEID })
export class EditHistoricalDatePartStore extends Store<EditPartState>
  implements EditPartStoreApi {
  constructor() {
    super(editPartInitialState);
  }

  public setDirty(value: boolean): void {
    this.update({ dirty: value });
  }
  public setSaving(value: boolean): void {
    this.update({ saving: value });
  }
}
