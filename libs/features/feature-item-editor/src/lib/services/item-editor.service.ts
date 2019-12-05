import { Injectable } from '@angular/core';
import { ItemStore } from '../state/item.store';
import { ItemService, FlagService, FacetService } from '@cadmus/api';
import { forkJoin } from 'rxjs';
import { Item, ErrorService } from '@cadmus/core';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ItemEditorService {
  constructor(
    private _itemStore: ItemStore,
    private _itemService: ItemService,
    private _facetService: FacetService,
    private _flagService: FlagService,
    private _errorService: ErrorService
  ) {}

  /**
   * Load the item with the specified ID and all the required lookup data
   * into the item store.
   */
  public load(itemId: string) {
    this._itemStore.setLoading();

    forkJoin({
      item: this._itemService.getItem(itemId, true),
      facetParts: this._facetService.getFacetParts(),
      facets: this._facetService.getFacets(),
      flags: this._flagService.getFlags()
    })
      .pipe(catchError(this._errorService.handleError))
      .subscribe(
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
        }
      );
  }

  public save(item: Item) {
    this._itemService
      .addItem(item)
      .pipe(catchError(this._errorService.handleError))
      .subscribe(_ => {
        this._itemStore.update(state => {
          return {
            ...state,
            item: item
          };
        });
      });
  }
}
