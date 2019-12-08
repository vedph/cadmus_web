import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { EditItemStore, EditItemState } from './edit-item.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditItemQuery extends Query<EditItemState> {
  constructor(protected store: EditItemStore) {
    super(store);
  }

  public selectSaving(): Observable<boolean> {
    return this.select(state => state.saving);
  }

  public selectDeletingPart(): Observable<boolean> {
    return this.select(state => state.deletingPart);
  }

  public hasItem(id: string = null): boolean {
    const item = this.getValue().item;
    if (!item || (id && id !== item.id)) {
      return false;
    }
    return true;
  }
}
