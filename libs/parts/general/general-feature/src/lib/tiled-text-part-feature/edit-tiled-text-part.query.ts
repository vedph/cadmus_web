import { Injectable } from '@angular/core';
import { UtilService } from '@cadmus/core';
import { EditPartQueryBase } from '@cadmus/features/edit-state';
import { EditTiledTextPartStore } from './edit-tiled-text-part.store';

@Injectable({ providedIn: 'root' })
export class EditTiledTextPartQuery extends EditPartQueryBase {
  constructor(store: EditTiledTextPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
