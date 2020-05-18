import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditFragmentServiceBase } from '@cadmus/features/edit-state';
import { EditQuotationsFragmentStore } from './edit-quotations-fragment.store';

@Injectable({ providedIn: 'root' })
export class EditQuotationsFragmentService extends EditFragmentServiceBase {
  constructor(
    editPartStore: EditQuotationsFragmentStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
