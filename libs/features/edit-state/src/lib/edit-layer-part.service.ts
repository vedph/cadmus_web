import { Injectable } from '@angular/core';
import { ItemService, FacetService } from '@cadmus/api';
import { EditLayerPartStore } from './edit-layer-part.store';
import { forkJoin } from 'rxjs';
import {
  TextLayerPart,
  TokenLocation,
  UtilService,
  Fragment
} from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class EditLayerPartService {
  constructor(
    private _store: EditLayerPartStore,
    private _itemService: ItemService,
    private _facetService: FacetService,
    private _utilService: UtilService
  ) {}

  /**
   * Load the state for editing layer part(s).
   *
   * @param itemId The item ID the layer part belongs to.
   * @param partId The layer part ID.
   */
  public load(itemId: string, partId: string) {
    if (this._store.getValue().loading) {
      return;
    }
    this._store.setLoading(true);

    forkJoin({
      // TODO: eventually optimize by adding method param to load only fragments locations
      layerPart: this._itemService.getPart(partId),
      baseText: this._itemService.getBaseTextPart(itemId),
      layers: this._facetService.getFacetParts(itemId, true),
      breakChance: this._itemService.getLayerPartBreakChance(partId),
      layerHints: this._itemService.getLayerPartHints(partId)
    }).subscribe(
      result => {
        this._store.update({
          part: result.layerPart as TextLayerPart,
          baseText: result.baseText.text,
          baseTextPart: result.baseText.part,
          breakChance: result.breakChance.chance,
          layerHints: result.layerHints,
          loading: false,
          error: null
        });
      },
      error => {
        console.error(error);
        this._store.setLoading(false);
        this._store.setError('Error loading text layer part ' + partId);
      }
    );
  }

  /**
   * Refresh the layer part break chance.
   */
  public refreshBreakChance() {
    const store = this._store.getValue();
    const part = store.part;
    if (!part || store.refreshingBreakChance) {
      return;
    }
    this._store.setRefreshingBreakChance(true);
    this._itemService.getLayerPartBreakChance(part.id).subscribe(
      result => {
        this._store.setRefreshingBreakChance(false);
        this._store.setBreakChance(result.chance);
      },
      error => {
        console.error(error);
        this._store.setRefreshingBreakChance(false);
        this._store.setBreakChance(-1);
        this._store.setError(
          'Error refreshing break chance for text layer part ' + part.id
        );
      }
    );
  }

  /**
   * Delete the fragment at the specified location.
   *
   * @param loc The fragment's location.
   */
  public deleteFragment(loc: TokenLocation) {
    this._store.setDeletingFragment(true);

    // find the fragment
    let part = this._store.getValue().part;
    if (!part) {
      return;
    }
    const i = part.fragments.findIndex(p => {
      return TokenLocation.parse(p.location).overlaps(loc);
    });
    if (i === -1) {
      return;
    }

    // remove it from the part
    // work on a copy, as store objects are immutable
    part = this._utilService.deepCopy(part);
    part.fragments.splice(i, 1);

    // update the part and reload state once done
    this._itemService.addPart(part).subscribe(
      _ => {
        this._store.setDeletingFragment(false);
        this.load(part.itemId, part.id);
        // this._store.update({
        //   part: part,
        //   deletingFragment: false,
        //   error: null
        // });
      },
      error => {
        console.error(error);
        this._store.setDeletingFragment(false);
        this._store.setError(
          `Error deleting fragment at ${loc} in part ${part.id}`
        );
      }
    );
  }

  /**
   * Save the specified fragment.
   *
   * @param fragment The fragment.
   */
  public saveFragment(fragment: Fragment) {
    this._store.setSavingFragment();

    // find the fragment
    let part = this._store.getValue().part;
    if (!part) {
      return;
    }

    // add or replace it
    // work on a copy, as store objects are immutable
    part = this._utilService.deepCopy(part);

    // replace all the overlapping fragments with the new one
    const newLoc = TokenLocation.parse(fragment.location);
    let insertAt = 0;
    for (let i = part.fragments.length - 1; i > -1; i--) {
      const frLoc = TokenLocation.parse(part.fragments[i].location);
      if (newLoc.compareTo(frLoc) >= 0) {
        insertAt = i + 1;
      }
      if (newLoc.overlaps(frLoc)) {
        part.fragments.splice(i, 1);
        if (insertAt > i && insertAt > 0) {
          insertAt--;
        }
      }
    }

    // add the new fragment
    part.fragments.splice(insertAt, 0, fragment);

    // update the part and reload once done
    this._itemService.addPart(part).subscribe(
      _ => {
        this.load(part.itemId, part.id);
        // this._store.update({
        //   part: part,
        //   deletingFragment: false,
        //   error: null
        // });
      },
      error => {
        console.error(error);
        this._store.setSavingFragment(false);
        this._store.setError(
          `Error saving fragment at ${fragment.location} in part ${part.id}`
        );
      }
    );
  }
}
