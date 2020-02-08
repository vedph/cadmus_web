import { Injectable } from '@angular/core';
import { ItemService, FlagService, FacetService, ThesaurusService } from '@cadmus/api';
import { forkJoin } from 'rxjs';
import { Item, FacetDefinition } from '@cadmus/core';
import { EditItemStore } from './edit-item.store';

/**
 * The service which handles the edit item store.
 */
@Injectable({ providedIn: 'root' })
export class EditItemService {
  constructor(
    private _store: EditItemStore,
    private _itemService: ItemService,
    private _facetService: FacetService,
    private _flagService: FlagService,
    private _thesaurusService: ThesaurusService
  ) {}

  private pickDefaultFacet(facets: FacetDefinition[]): FacetDefinition | null {
    if (!facets.length) {
      return null;
    }
    // if there is a facet with id="default", pick it
    const defaultFacet = facets.find(f => f.id === 'default');
    if (defaultFacet) {
      return defaultFacet;
    }
    // else just pick the first in the list
    return facets[0];
  }

  /**
   * Load the item with the specified ID (if any; the ID can be null for
   * a new item), and all the required lookup data into the item store.
   */
  public load(itemId: string) {
    this._store.setLoading(true);

    const facets$ = this._facetService.getFacets();
    const flags$ = this._flagService.getFlags();
    const thesaurus$ = this._thesaurusService.getThesaurus('model-types@en', true);

    // if not a new item, include it in load
    if (itemId) {
      forkJoin({
        item: this._itemService.getItem(itemId, true),
        facets: facets$,
        flags: flags$,
        thesaurus: thesaurus$
      }).subscribe(
        result => {
          this._store.setLoading(false);
          this._store.setError(null);

          const itemFacet = result.facets.find(f => {
            return f.id === result.item.facetId;
          });
          const facetParts = itemFacet? itemFacet.partDefinitions : [];

          this._store.update({
            item: result.item,
            partGroups: this._itemService.groupParts(
              result.item.parts,
              facetParts
            ),
            facet: result.facets.find(f => f.id === result.item.facetId),
            facets: result.facets,
            flags: result.flags,
            typeThesaurus: result.thesaurus
          });
        },
        error => {
          console.error(error);
          this._store.setLoading(false);
          this._store.setError('Error loading item ' + itemId);
        }
      );
    } else {
      // if new, just set an empty item
      forkJoin({
        facets: facets$,
        flags: flags$,
        thesaurus: thesaurus$
      }).subscribe(
        result => {
          this._store.setLoading(false);
          this._store.setError(null);

          const facetParts = result.facets[0].partDefinitions;

          this._store.update({
            item: {
              id: null,
              title: null,
              description: null,
              facetId: null,
              sortKey: null,
              flags: 0,
              timeCreated: new Date(),
              creatorId: null,
              timeModified: new Date(),
              userId: null
            },
            partGroups: [],
            facet: this.pickDefaultFacet(result.facets),
            facets: result.facets,
            flags: result.flags,
            typeThesaurus: result.thesaurus
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

        // we need to update the facet's parts as the item just saved
        // could have changed its facet
        const itemFacet = this._store.getValue().facets.find(f => {
          return f.id === item.facetId;
        });
        this._store.update({
          item: item,
          facet: itemFacet
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
        // once deleted, update the local store by removing the deleted part
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
