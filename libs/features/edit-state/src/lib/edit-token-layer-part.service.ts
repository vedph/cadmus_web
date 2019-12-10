import { Injectable } from '@angular/core';
import { ItemService, FacetService } from '@cadmus/api';
import {
  EditTokenLayerPartStore,
  TOKEN_TEXT_PART_TYPEID
} from './edit-token-layer-part.store';
import { forkJoin } from 'rxjs';
import {
  TokenTextLayerPart,
  Part,
  PartDefinition,
  TokenLocation,
  UtilService,
  Fragment
} from '@cadmus/core';

interface TokenTextPart extends Part {
  lines: { y: number; text: string }[];
}

@Injectable({ providedIn: 'root' })
export class EditTokenLayerPartService {
  constructor(
    private _store: EditTokenLayerPartStore,
    private _itemService: ItemService,
    private _facetService: FacetService,
    private _utilService: UtilService
  ) {}

  public load(itemId: string, partId: string) {
    this._store.setLoading(true);

    forkJoin({
      // TODO: eventually optimize by adding method param to load only fragments locations
      layerPart: this._itemService.getPart(partId),
      basePart: this._itemService.getPartFromTypeAndRole(
        itemId,
        TOKEN_TEXT_PART_TYPEID
      ),
      layers: this._facetService.getFacetParts(),
      rolePartIds: this._itemService.getItemLayerPartIds(itemId)
    }).subscribe(
      result => {
        this._store.update({
          part: result.layerPart as TokenTextLayerPart,
          baseText: (result.basePart as TokenTextPart).lines
            .map(l => l.text)
            .join('\n'),
          layers: result.layers.filter(l => {
            return l.roleId && l.roleId.startsWith('fr.');
          }),
          selectedLayer: null,
          rolePartIds: result.rolePartIds,
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

  public addAndLoad(itemId: string) {
    this._store.setLoading(true);

    const part: TokenTextLayerPart = {
      id: null,     // this will be filled by server
      itemId: itemId,
      typeId: TOKEN_TEXT_PART_TYPEID,
      roleId: null,
      fragments: [],
      userId: null, // this will be filled by server
      timeModified: new Date()
    };
    this._itemService.addPart(part).subscribe(result => {
      this._store.setLoading(false);
      this.load(itemId, result.id);
    }, error => {
      console.error(error);
      this._store.setLoading(false);
      this._store.setError('Error adding text layer part for item ' + itemId);
  });
  }

  public selectLayer(layer: PartDefinition) {
    this._store.update({
      selectedLayer: layer
    });
  }

  public deleteFragment(loc: TokenLocation) {
    this._store.setDeletingFragment(true);

    // find the fragment and remove it from the part
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

    // work on a copy, as store objects are immutable
    part = this._utilService.deepCopy(part);
    part.fragments.splice(i, 1);

    // update the part
    this._itemService.addPart(part).subscribe(
      _ => {
        this._store.update({
          part: part,
          deletingFragment: false,
          error: null
        });
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

  public saveFragment(fragment: Fragment) {
    this._store.setSavingFragment();

    let part = this._store.getValue().part;
    if (!part) {
      return;
    }

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

    // update the part
    this._itemService.addPart(part).subscribe(
      _ => {
        this._store.update({
          part: part,
          deletingFragment: false,
          error: null
        });
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
