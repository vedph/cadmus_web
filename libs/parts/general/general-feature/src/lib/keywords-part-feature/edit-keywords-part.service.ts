import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditKeywordsPartStore } from './edit-keywords-part.store';
import { EditPartServiceBase } from '@cadmus/features/edit-state';

@Injectable({ providedIn: 'root' })
export class EditKeywordsPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditKeywordsPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
