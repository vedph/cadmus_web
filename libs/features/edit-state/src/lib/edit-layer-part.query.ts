import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { EditLayerPartState, EditLayerPartStore } from './edit-layer-part.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditLayerPartQuery extends Query<EditLayerPartState> {
  constructor(protected store: EditLayerPartStore) {
    super(store);
  }

  public getDeletingFragment(): Observable<boolean> {
    return this.select(state => state.deletingFragment);
  }

  public getSavingFragment(): Observable<boolean> {
    return this.select(state => state.savingFragment);
  }
}
