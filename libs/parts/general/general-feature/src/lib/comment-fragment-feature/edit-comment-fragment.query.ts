import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThesauriSet, UtilService, Fragment } from '@cadmus/core';
import { EditFragmentState } from '@cadmus/features/edit-state';
import { EditCommentFragmentStore } from './edit-comment-fragment.store';

@Injectable({ providedIn: 'root' })
export class EditCommentFragmentQuery extends Query<EditFragmentState> {
  constructor(
    protected store: EditCommentFragmentStore
  ) {
    super(store);
  }

  public selectDirty(): Observable<boolean> {
    return this.select(state => state.dirty);
  }

  public selectSaving(): Observable<boolean> {
    return this.select(state => state.saving);
  }

  public selectJson(): Observable<string> {
    return this.select(state => state.fragment).pipe(
      map((fr: Fragment) => {
        // supply IDs
        if (fr) {
          return JSON.stringify(fr);
        } else return '{}';
      })
    );
  }

  public selectThesauri(): Observable<ThesauriSet> {
    return this.select(state => state.thesauri);
  }
}
