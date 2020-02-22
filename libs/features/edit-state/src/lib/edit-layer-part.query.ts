import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {
  EditLayerPartState,
  EditLayerPartStore
} from './edit-layer-part.store';
import { Observable } from 'rxjs';
import { LayerHint } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class EditLayerPartQuery extends Query<EditLayerPartState> {
  constructor(protected store: EditLayerPartStore) {
    super(store);
  }

  public selectDeletingFragment(): Observable<boolean> {
    return this.select(state => state.deletingFragment);
  }

  public selectSavingFragment(): Observable<boolean> {
    return this.select(state => state.savingFragment);
  }

  public selectRefreshingBreakChance(): Observable<boolean> {
    return this.select(state => state.refreshingBreakChance);
  }

  public selectBreakChance(): Observable<number> {
    return this.select(state => state.breakChance);
  }

  public selectLayerHints(): Observable<LayerHint[]> {
    return this.select(state => state.layerHints);
  }
}
