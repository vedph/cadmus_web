import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditFragmentServiceBase } from '@cadmus/features/edit-state';
import { EditWitnessesFragmentStore } from './edit-witnesses-fragment.store';

@Injectable({ providedIn: 'root' })
export class EditWitnessesFragmentService extends EditFragmentServiceBase {
  constructor(
    editPartStore: EditWitnessesFragmentStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
