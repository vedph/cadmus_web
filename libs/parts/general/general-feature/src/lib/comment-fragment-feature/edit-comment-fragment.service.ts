import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditFragmentServiceBase } from '@cadmus/features/edit-state';
import { EditCommentFragmentStore } from './edit-comment-fragment.store';

@Injectable({ providedIn: 'root' })
export class EditCommentFragmentService extends EditFragmentServiceBase {
  constructor(
    editPartStore: EditCommentFragmentStore,
    itemService: ItemService,
    thesaurusService: ThesaurusService
  ) {
    super(itemService, thesaurusService);
    this.store = editPartStore;
  }
}
