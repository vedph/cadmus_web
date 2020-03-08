import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditIndexKeywordsPartStore } from './edit-index-keywords-part.store';
import { EditPartServiceBase } from '@cadmus/features/edit-state';

@Injectable({ providedIn: 'root' })
export class EditIndexKeywordsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditIndexKeywordsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
