import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditHistoricalDatePartStore } from './edit-historical-date-part.store';
import { EditPartServiceBase } from '@cadmus/features/edit-state';

@Injectable({ providedIn: 'root' })
export class EditHistoricalDatePartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditHistoricalDatePartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
