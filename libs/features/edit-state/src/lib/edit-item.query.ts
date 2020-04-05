import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { EditItemStore, EditItemState } from './edit-item.store';
import { Observable } from 'rxjs';
import { LibraryRouteService, FacetDefinition, Item, Part } from '@cadmus/core';

/**
 * The query facade to the edit item store.
 */
@Injectable({ providedIn: 'root' })
export class EditItemQuery extends Query<EditItemState> {
  constructor(
    protected store: EditItemStore,
    private _libraryRouteService: LibraryRouteService
  ) {
    super(store);
  }

  public selectItem(): Observable<Item> {
    return this.select(state => state.item);
  }

  public selectParts(): Observable<Part[]> {
    return this.select(state => state.parts);
  }

  public selectFacet(): Observable<FacetDefinition> {
    return this.select(state => state.facet);
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

  public getEditorKeyFromPartTypeId(
    typeId: string,
    roleId: string = null
  ): string {
    const facet = this.getValue().facet;
    if (!facet) {
      return 'default';
    }
    return this._libraryRouteService.getEditorKeyFromPartType(typeId, roleId)
      .partKey;
  }
}
