import { EditPartState } from '..';
import { UtilService, Part, ThesauriSet } from '@cadmus/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';
import { map } from 'rxjs/operators';

/**
 * Base class for implementing editor part queries.
 * To implement an editor part query, just extend this passing the specialized
 * part's store to the constructor.
 */
export abstract class EditPartQueryBase extends Query<EditPartState> {
  constructor(protected store: any, private _utilService: UtilService) {
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
