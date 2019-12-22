import { Injectable } from '@angular/core';
import { ItemService, FlagService, FacetService } from '@cadmus/api';
import { forkJoin } from 'rxjs';
import { Item } from '@cadmus/core';
import { EditItemStore } from './edit-item.store';

@Injectable({ providedIn: 'root' })
export class EditItemService {
  constructor(
    private _store: EditItemStore,
    private _itemService: ItemService,
    private _facetService: FacetService,
    private _flagService: FlagService
  ) {}

  /**
   * Load the item with the specified ID (if any; the ID can be null for
   * a new item), and all the required lookup data into the item store.
   */
  public load(itemId: string) {
    this._store.setLoading(true);

    if (itemId) {
      // load item, part definitions, facets definitions, and flags definitions
      forkJoin({
        item: this._itemService.getItem(itemId, true),
        facetParts: this._facetService.getFacetParts(),
        facets: this._facetService.getFacets(),
        flags: this._flagService.getFlags()
      }).subscribe(
        result => {
          this._store.setLoading(false);
          this._store.setError(null);

          this._store.update({
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
          console.error(error);
          this._store.setLoading(false);
          this._store.setError('Error loading item ' + itemId);
        }
      );
    } else {
      // load item, part definitions, facets definitions, and flags definitions
      forkJoin({
        facetParts: this._facetService.getFacetParts(),
        facets: this._facetService.getFacets(),
        flags: this._flagService.getFlags()
      }).subscribe(
        result => {
          this._store.setLoading(false);
          this._store.setError(null);

          this._store.update({
            item: {
              id: null,
              title: null,
              description: null,
              facetId: null,
              sortKey: null,
              flags: 0,
              timeModified: new Date(),
              userId: null
            },
            partGroups: [],
            facetParts: result.facetParts,
            facets: result.facets,
            flags: result.flags
          });
        },
        error => {
          console.error(error);
          this._store.setLoading(false);
          this._store.setError('Error loading item ' + itemId);
        }
      );
    }
  }

  /**
   * Reset the item.
   */
  public reset() {
    this._store.reset();
  }

  /**
   * Save the item and update the store.
   * @param item The item to be saved.
   */
  public save(item: Item) {
    this._store.setSaving();
    this._itemService.addItem(item).subscribe(
      _ => {
        this._store.setSaving(false);
        this._store.update({
          item: item
        });
      },
      error => {
        console.error(error);
        this._store.setSaving(false);
        this._store.setError('Error saving item');
      }
    );
  }

  /**
   * Delete the part with the specified ID from the edited item.
   * @param id The ID of the part to be deleted.
   */
  public deletePart(id: string) {
    this._store.setDeletingPart();
    // delete from server
    this._itemService.deletePart(id).subscribe(
      _ => {
        // once deleted, update the store by removing the deleted part
        const groups = this._store.getValue().partGroups;
        for (let i = 0; i < groups.length; i++) {
          for (let j = 0; j < groups[i].parts.length; j++) {
            if (groups[i].parts[j].id === id) {
              groups[i].parts.splice(j, 1);
              i = groups.length;
              break;
            }
          }
        }
        this._store.update({
          partGroups: groups
        });
      },
      error => {
        console.log(error);
        this._store.setDeletingPart(false);
        this._store.setError('Error deleting part ' + id);
      }
    );
  }
}
