import { Injectable } from '@angular/core';
import { ItemStore } from '../state/item.store';
import { ItemService, FlagService, FacetService } from '@cadmus/api';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ItemEditorService {
  constructor(
    private _itemStore: ItemStore,
    private _itemService: ItemService,
    private _facetService: FacetService,
    private _flagService: FlagService
  ) {}

  public load(itemId: string) {
    this._itemStore.setLoading();

    forkJoin({
      item: this._itemService.getItem(itemId, true),
      facetParts: this._facetService.getFacetParts(),
      facets: this._facetService.getFacets(),
      flags: this._flagService.getFlags()
    }).subscribe(
      result => {
        this._itemStore.setLoading(false);
        this._itemStore.setError(null);

        this._itemStore.update({
          item: result.item,
          partGroups: this._itemService.groupParts(
            result.item.parts,
            result.facetParts
          ),
          facetParts: result.facetParts,
          facets: result.facets,
          flags: result.flags
        });
      },
      error => {
        this._itemStore.setLoading(false);
        this._itemStore.setError('Error loading item ' + itemId);
        console.error(error);
      }
    );
  }
}
