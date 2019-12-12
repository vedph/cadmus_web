import { Injectable } from '@angular/core';
import { UtilService } from '@cadmus/core';
import { EditPartQueryBase } from '@cadmus/features/edit-state';
import { EditCategoriesPartStore } from './edit-categories-part.store';

@Injectable({ providedIn: 'root' })
export class EditCategoriesPartQuery extends EditPartQueryBase {
  constructor(store: EditCategoriesPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
