import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { EditTokenLayerPartState, EditTokenLayerPartStore } from './edit-token-layer-part.store';

@Injectable({ providedIn: 'root' })
export class EditTokenLayerPartQuery extends Query<EditTokenLayerPartState> {
  constructor(protected store: EditTokenLayerPartStore) {
    super(store);
  }
}
