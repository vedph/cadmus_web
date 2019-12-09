import { Injectable } from '@angular/core';
import { ItemService, FacetService } from '@cadmus/api';
import {
  EditTokenLayerPartStore,
  TOKEN_TEXT_PART_TYPEID
} from './edit-token-layer-part.store';
import { forkJoin } from 'rxjs';
import { TokenTextLayerPart, Part, PartDefinition } from '@cadmus/core';

interface TokenTextPart extends Part {
  lines: { y: number; text: string }[];
}

@Injectable({ providedIn: 'root' })
export class EditTokenLayerPartService {
  constructor(
    private _store: EditTokenLayerPartStore,
    private _itemService: ItemService,
    private _facetService: FacetService
  ) {}

  public load(itemId: string, partId: string) {
    this._store.setLoading(true);

    forkJoin({
      // TODO: optimize by adding method param to load only fragments locations
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

  public selectLayer(layer: PartDefinition) {
    this._store.update({
      selectedLayer: layer
    });
  }
}
