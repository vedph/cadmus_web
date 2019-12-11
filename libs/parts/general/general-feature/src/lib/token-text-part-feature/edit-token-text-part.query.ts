import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThesauriSet, Part, UtilService } from '@cadmus/core';
import { EditPartState } from '@cadmus/features/edit-state';
import { EditTokenTextPartStore } from './edit-token-text-part.store';

@Injectable({ providedIn: 'root' })
export class EditTokenTextPartQuery extends Query<EditPartState> {
  constructor(
    protected store: EditTokenTextPartStore,
    private _utilService: UtilService
  ) {
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
          const clone: Part = this._utilService.deepCopy(part) as Part;
          clone.itemId = itemId;
          clone.id = partId;
          clone.roleId = roleId;
          return JSON.stringify(clone);
        } else return '{}';
      })
    );
  }

  public selectThesauri(): Observable<ThesauriSet> {
    return this.select(state => state.thesauri);
  }
}
