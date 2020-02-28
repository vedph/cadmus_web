import { Injectable } from '@angular/core';
import { ItemService } from '@cadmus/api';
import { forkJoin } from 'rxjs';
import { Item, FacetDefinition, Part } from '@cadmus/core';
import { EditItemStore } from './edit-item.store';
import { AppQuery } from './app.query';

/**
 * The service which handles the edit item store.
 */
@Injectable({ providedIn: 'root' })
export class EditItemService {
  constructor(
    private _store: EditItemStore,
    private _appQuery: AppQuery,
    private _itemService: ItemService
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

    const layers$ = this._itemService.getItemLayerInfo(itemId, true);
    const appState = this._appQuery.getValue();

    // if not a new item, include it in load
    if (itemId) {
      forkJoin({
        item: this._itemService.getItem(itemId, true),
        layers: layers$
      }).subscribe(
        result => {
          this._store.setLoading(false);
          this._store.setError(null);

          const itemFacet = appState.facets.find(f => {
            return f.id === result.item.facetId;
          });
          const facetParts = itemFacet ? itemFacet.partDefinitions : [];

          this._store.update({
            item: result.item,
            parts: result.item.parts,
            partGroups: this._itemService.groupParts(
              result.item.parts,
              facetParts
            ),
            layerPartInfos: result.layers,
            facet: appState.facets.find(f => f.id === result.item.facetId)
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
        layers: layers$
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
              groupId: null,
              sortKey: null,
              flags: 0,
              timeCreated: new Date(),
              creatorId: null,
              timeModified: new Date(),
              userId: null
            },
            parts: [],
            partGroups: [],
            layerPartInfos: result.layers,
            facet: this.pickDefaultFacet(appState.facets)
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
        // reload the store
        this.load(this._store.getValue().item.id);
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
        this._store.setDeletingPart(false);
        // reload the store
        this.load(this._store.getValue().item.id);
      },
      error => {
        console.log(error);
        this._store.setDeletingPart(false);
        this._store.setError('Error deleting part ' + id);
      }
    );
  }

  public addNewLayerPart(itemId: string, typeId: string, roleId: string) {
    const part: Part = {
      itemId: itemId,
      typeId: typeId,
      roleId: roleId,
      id: null,
      creatorId: null,
      userId: null,
      timeCreated: new Date(),
      timeModified: new Date()
    };
    this._store.setSaving();
    this._itemService.addPart(part).subscribe(
      _ => {
        this._store.setSaving(false);
        // reload the store
        this.load(this._store.getValue().item.id);
      },
      error => {
        console.log(error);
        this._store.setSaving(false);
        this._store.setError('Error adding new layer part for item ' + itemId);
      }
    );
  }

  public setPartThesaurusScope(ids: string[], scope: string) {
    this._store.setSaving();
    this._itemService.setPartThesaurusScope(ids, scope).subscribe(
      _ => {
        this._store.setSaving(false);
        // reload the store
        this.load(this._store.getValue().item.id);
      },
      error => {
        console.log(error);
        this._store.setSaving(false);
        this._store.setError('Error setting item\'s parts scope');
      }
    );
  }
}
