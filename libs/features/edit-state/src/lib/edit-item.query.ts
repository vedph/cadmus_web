import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { EditItemStore, EditItemState } from './edit-item.store';
import { Observable } from 'rxjs';
import { LibraryRouteService } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class EditItemQuery extends Query<EditItemState> {
  constructor(
    protected store: EditItemStore,
    private _libraryRouteService: LibraryRouteService
  ) {
    super(store);
  }

  public selectSaving(): Observable<boolean> {
    return this.select(state => state.saving);
  }

  public selectDeletingPart(): Observable<boolean> {
    return this.select(state => state.deletingPart);
  }

  public hasItem(id: string = null): boolean {
    const item = this.getValue().item;
    if (!item || (id && id !== item.id)) {
      return false;
    }
    return true;
  }

  public getGroupKeyFromPartTypeId(
    typeId: string,
    roleId: string = null
  ): string {
    const defs = this.getValue().facetParts;
    if (!defs) {
      return 'default';
    }
    return this._libraryRouteService.getGroupKeyFromPartType(
      defs,
      typeId,
      roleId
    );
  }
}
