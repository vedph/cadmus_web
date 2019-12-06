import { Injectable } from '@angular/core';
import { ItemService, ThesaurusService } from '@cadmus/api';
import { EditPartStore } from './edit-part.store';
import { ErrorService } from '@cadmus/core';
import { catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditPartService {
  constructor(
    private _editPartStore: EditPartStore<any>,
    private _itemService: ItemService,
    private _thesaurusService: ThesaurusService,
    private _errorService: ErrorService
  ) {}

  public load(partId: string, thesauriIds: string[] | null = null) {
    this._editPartStore.setLoading(true);

    if (thesauriIds) {
      forkJoin({
        part: this._itemService.getPart(partId),
        thesauri: this._thesaurusService.getThesauri(thesauriIds)
      })
        .pipe(catchError(this._errorService.handleError))
        .subscribe(result => {
          this._editPartStore.setLoading(false);
          this._editPartStore.update({
            part: result.part,
            thesauri: result.thesauri
          });
        });
    } else {
      this._itemService
        .getPart(partId)
        .pipe(catchError(this._errorService.handleError))
        .subscribe(
          part => {
            this._editPartStore.setLoading(false);
            this._editPartStore.update({
              part: part
            });
          },
          error => {
            console.error(error);
            this._editPartStore.setLoading(false);
            this._editPartStore.setError('Error loading part ' + partId);
          }
        );
    }
  }

  public setDirty(value = true) {
    this._editPartStore.update({
      dirty: value
    });
  }
}
