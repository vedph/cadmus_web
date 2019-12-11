import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditPartServiceBase } from '@cadmus/features/edit-state';
import { EditTokenTextPartStore } from './edit-token-text-part.store';

@Injectable({ providedIn: 'root' })
export class EditTokenTextPartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditTokenTextPartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
