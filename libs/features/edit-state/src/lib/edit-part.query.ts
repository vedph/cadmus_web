import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThesauriSet, Part } from '@cadmus/core';
import { EditPartState, EditPartStore } from './edit-part.store';

@Injectable({ providedIn: 'root' })
export class EditPartQuery extends Query<EditPartState> {
  constructor(protected store: EditPartStore) {
    super(store);
  }

  public selectDirty(): Observable<boolean> {
    return this.select(state => state.dirty);
  }

  public selectSaving(): Observable<boolean> {
    return this.select(state => state.saving);
  }

  public selectJson(
    itemId: string,
    partId: string,
    roleId: string | null
  ): Observable<string> {
    return this.select(state => state.part).pipe(
      map((part: Part) => {
        // supply IDs
        if (part) {
          part['itemId'] = itemId;
          part['id'] = partId;
          part['roleId'] = roleId;
        }
        return JSON.stringify(part || {});
      })
    );
  }

  public selectThesauri(): Observable<ThesauriSet> {
    return this.select(state => state.thesauri);
  }
}
