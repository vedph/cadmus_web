import { ItemService, ThesaurusService } from '@cadmus/api';
import { forkJoin } from 'rxjs';

export interface EditPartStoreApi {
  update(value: any): void;
  setLoading(value: boolean): void;
  setDirty(value: boolean): void;
  setSaving(value: boolean): void;
  setError(value: string): void;
}

export abstract class EditPartServiceBase {
  protected store: EditPartStoreApi;

  constructor(
    private _itemService: ItemService,
    private _thesaurusService: ThesaurusService
  ) {}

  public load(partId: string, thesauriIds: string[] | null = null) {
    this.store.setLoading(true);

    if (thesauriIds) {
      forkJoin({
        part: this._itemService.getPart(partId),
        thesauri: this._thesaurusService.getThesauri(thesauriIds)
      }).subscribe(result => {
        this.store.setLoading(false);
        this.store.update({
          part: result.part,
          thesauri: result.thesauri
        });
      });
    } else {
      this._itemService.getPart(partId).subscribe(
        part => {
          this.store.setLoading(false);
          this.store.update({
            part: part
          });
        },
        error => {
          console.error(error);
          this.store.setLoading(false);
          this.store.setError('Error loading part ' + partId);
        }
      );
    }
  }

  public setDirty(value = true) {
    this.store.setDirty(value);
  }
}
