import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NotePartStore, NotePartState } from './note-part.store';

@Injectable({ providedIn: 'root' })
export class NotePartQuery extends Query<NotePartState> {
  constructor(protected store: NotePartStore) {
    super(store);
  }
}
