import { EditPartServiceBase } from '@cadmus/features/edit-state';
import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { ErrorService } from '@cadmus/core';
import { EditNotePartStore } from './edit-note-part.store';

@Injectable({ providedIn: 'root' })
export class EditNotePartService extends EditPartServiceBase {
  constructor(
    editPartStore: EditNotePartStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService,
    errorService: ErrorService
  ) {
    super(itemService, thesaurusService, errorService);
    this.store = editPartStore;
  }
}
