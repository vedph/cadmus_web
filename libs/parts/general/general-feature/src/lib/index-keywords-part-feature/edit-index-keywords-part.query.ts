import { Injectable } from '@angular/core';
import { UtilService } from '@cadmus/core';
import { EditPartQueryBase } from '@cadmus/features/edit-state';
import { EditIndexKeywordsPartStore } from './edit-index-keywords-part.store';

@Injectable({ providedIn: 'root' })
export class EditIndexKeywordsPartQuery extends EditPartQueryBase {
  constructor(store: EditIndexKeywordsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
