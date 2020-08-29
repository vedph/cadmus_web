import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThesauriSet, Fragment } from '@cadmus/core';
import { EditFragmentState } from '@cadmus/features/edit-state';

export abstract class EditFragmentQueryBase extends Query<EditFragmentState> {
  constructor(protected store: any) {
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
