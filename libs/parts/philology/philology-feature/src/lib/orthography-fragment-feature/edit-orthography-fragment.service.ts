import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditFragmentServiceBase } from '@cadmus/features/edit-state';
import { EditOrthographyFragmentStore } from './edit-orthography-fragment.store';

@Injectable({ providedIn: 'root' })
export class EditOrthographyFragmentService extends EditFragmentServiceBase {
  constructor(
    editPartStore: EditOrthographyFragmentStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
