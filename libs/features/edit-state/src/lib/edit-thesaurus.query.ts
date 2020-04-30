import { EditThesaurusState, EditThesaurusStore } from './edit-thesaurus.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Thesaurus } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class EditThesaurusQuery extends Query<EditThesaurusState> {
  constructor(protected store: EditThesaurusStore) {
    super(store);
  }

  public selectThesaurus(): Observable<Thesaurus> {
    return this.select(state => state.thesaurus);
  }

  public selectLoading(): Observable<boolean> {
    return this.select(state => state.loading);
  }

  public selectSaving(): Observable<boolean> {
    return this.select(state => state.saving);
  }
}
