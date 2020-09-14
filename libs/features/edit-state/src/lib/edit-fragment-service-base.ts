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

/**
 * Base class for fragment editing services.
 */
export abstract class EditFragmentServiceBase {
  protected store: EditFragmentStoreApi;

  constructor(
    private _itemService: ItemService,
    private _thesaurusService: ThesaurusService
  ) {}

  /**
   * Load the specified fragment and thesauri.
   *
   * @param partId The ID of the part the fragment belongs to.
   * @param loc The fragment's location.
   * @param thesauriIds The optional requested thesauri IDs.
   */
  public load(
    partId: string,
    loc: string,
    thesauriIds: string[] | null = null
  ) {
    this.store.setLoading(true);

    if (thesauriIds) {
      // remove trailing ! from IDs if any
      const unscopedIds = thesauriIds.map((id) => {
        return this._thesaurusService.getScopedId(id, null);
      });

      forkJoin([
        this._itemService.getPart(partId),
        this._thesaurusService.getThesauriSet(unscopedIds),
      ]).subscribe(([part, thesauri]) => {
        const layerPart = part as TextLayerPart;
        const fr = layerPart.fragments.find((f) => f.location === loc);
        if (!fr) {
          // not found: new fragment
          this.store.update({
            fragment: {
              location: loc,
            },
            thesauri: thesauri,
            loading: false,
            error: null,
          });
        } else {
          // found: existing fragment
          this.store.update({
            fragment: fr,
            thesauri: thesauri,
            loading: false,
            error: null,
          });
        }
        // if the loaded layer part has a thesaurus scope, reload the thesauri
        if (part.thesaurusScope) {
          const scopedIds = thesauriIds.map((id) => {
            return this._thesaurusService.getScopedId(id, part.thesaurusScope);
          });
          this.store.setLoading(true);
          this._thesaurusService.getThesauriSet(scopedIds).subscribe(
            (scopedThesauri) => {
              this.store.update({
                thesauri: scopedThesauri,
              });
            },
            (error) => {
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
        (part) => {
          const layerPart = part as TextLayerPart;
          const fr = layerPart.fragments.find((f) => f.location === loc);
          if (!fr) {
            // not found: new fragment
            this.store.update({
              fragment: {
                location: loc,
              },
              loading: false,
              error: null,
            });
          } else {
            this.store.update({
              fragment: fr,
              loading: false,
              error: null,
            });
          }
        },
        (error) => {
          console.error(error);
          this.store.setLoading(false);
          this.store.setError('Error loading part ' + partId);
        }
      );
    }
  }

  /**
   * Save the fragments serialized into the specified JSON code
   * representing their part.
   *
   * @param json The JSON code representing the fragment.
   */
  public save(json: string): Promise<boolean> {
    this.store.setSaving(true);
    this.store.setDirty(true);

    return new Promise((resolve, reject) => {
      this._itemService.addPartJson(json).subscribe(
        (_) => {
          this.store.setSaving(false);
          this.store.setDirty(false);
          this.store.setError(null);
          resolve(true);
        },
        (error) => {
          console.error(error);
          this.store.setSaving(false);
          this.store.setError('Error saving fragment');
          reject(error);
        }
      );
    });
  }

  public setDirty(value = true) {
    this.store.setDirty(value);
  }
}
