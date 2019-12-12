import { Injectable } from '@angular/core';
import { UtilService } from '@cadmus/core';
import { EditPartQueryBase } from '@cadmus/features/edit-state';
import { EditKeywordsPartStore } from './edit-keywords-part.store';

@Injectable({ providedIn: 'root' })
export class EditKeywordsPartQuery extends EditPartQueryBase {
  constructor(store: EditKeywordsPartStore, utilService: UtilService) {
    super(store, utilService);
  }
}
