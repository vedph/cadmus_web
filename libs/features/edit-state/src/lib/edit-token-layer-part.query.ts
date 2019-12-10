import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { EditTokenLayerPartState, EditTokenLayerPartStore } from './edit-token-layer-part.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditTokenLayerPartQuery extends Query<EditTokenLayerPartState> {
  constructor(protected store: EditTokenLayerPartStore) {
    super(store);
  }

  public getDeletingFragment(): Observable<boolean> {
    return this.select(state => state.deletingFragment);
  }

  public getSavingFragment(): Observable<boolean> {
    return this.select(state => state.savingFragment);
  }
}
