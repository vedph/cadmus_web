import { Injectable } from '@angular/core';
import { EditFragmentQueryBase } from '@cadmus/features/edit-state';
import { EditCommentFragmentStore } from './edit-comment-fragment.store';

@Injectable({ providedIn: 'root' })
export class EditCommentFragmentQuery extends EditFragmentQueryBase {
  constructor(
    protected store: EditCommentFragmentStore
  ) {
    super(store);
  }
}
