import { Injectable } from '@angular/core';
import { EditNotePartStore } from './edit-note-part.store';
import { NotePart } from '@cadmus/parts/general/general-ui';
import { EditPartQuery } from '@cadmus/features/edit-state';

@Injectable({ providedIn: 'root' })
export class EditNotePartQuery extends EditPartQuery<NotePart> {
  constructor(protected store: EditNotePartStore) {
    super(store);
  }
}
