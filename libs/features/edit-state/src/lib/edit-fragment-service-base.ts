import { ItemService, ThesaurusService } from '@cadmus/api';
import { forkJoin } from 'rxjs';
import { TextLayerPart } from '@cadmus/core';

export interface EditFragmentStoreApi {
  update(value: any): void;
  setLoading(value: boolean): void;
  setDirty(value: boolean): void;
  setSaving(value: boolean): void;
  setError(value: string): void;
}

export abstract class EditFragmentServiceBase {
  protected store: EditFragmentStoreApi;

  constructor(
    private _itemService: ItemService,
    private _thesaurusService: ThesaurusService
  ) {}

  private setNotFoundError(partId: string, loc: string) {
    this.store.update({
      fragment: null,
      thesauri: null,
      loading: false,
      error: `Fragment at ${loc} in part ${partId} not found`
    });
  }

  public load(
    partId: string,
    loc: string,
    thesauriIds: string[] | null = null
  ) {
    this.store.setLoading(true);

    if (thesauriIds) {
      forkJoin({
        part: this._itemService.getPart(partId),
        thesauri: this._thesaurusService.getThesauri(thesauriIds)
      }).subscribe(result => {
        const layerPart = result.part as TextLayerPart;
        const fr = layerPart.fragments.find(f => f.location === loc);
        if (!fr) {
          this.setNotFoundError(partId, loc);
        } else {
          this.store.update({
            fragment: fr,
            thesauri: result.thesauri,
            loading: false,
            error: null
          });
        }
        // if the loaded layer part has a thesaurus scope, reload the thesauri
        if (result.part.thesaurusScope) {
          const scopedIds: string[] = thesauriIds.map(id => {
            return this._thesaurusService.getScopedId(
              id,
              result.part.thesaurusScope
            );
          });
          this.store.setLoading(true);
          this._thesaurusService.getThesauri(thesauriIds).subscribe(
            thesauri => {
              this.store.update({
                thesauri: thesauri
              });
            },
            error => {
              console.error(error);
              this.store.setLoading(false);
              this.store.setError(
                'Error loading thesauri ' + scopedIds.join(', ')
              );
            }
          );
        } // scoped
      });
    } else {
      this._itemService.getPart(partId).subscribe(
        part => {
          const layerPart = part as TextLayerPart;
          const fr = layerPart.fragments.find(f => f.location === loc);
          if (!fr) {
            this.setNotFoundError(partId, loc);
          } else {
            this.store.update({
              fragment: fr,
              loading: false,
              error: null
            });
          }
        },
        error => {
          console.error(error);
          this.store.setLoading(false);
          this.store.setError('Error loading part ' + partId);
        }
      );
    }
  }

  public save(json: string) {
    this.store.setSaving(true);
    this.store.setDirty(true);

    this._itemService.addPartJson(json).subscribe(
      _ => {
        this.store.setSaving(false);
        this.store.setDirty(false);
        this.store.setError(null);
      },
      error => {
        console.error(error);
        this.store.setSaving(true);
        this.store.setError('Error saving part');
      }
    );
  }

  public setDirty(value = true) {
    this.store.setDirty(value);
  }
}
