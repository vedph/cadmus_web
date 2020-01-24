import { Injectable } from '@angular/core';
import { FacetService } from './facet.service';
import { take, retry } from 'rxjs/operators';

export const RS_TEXT_LAYER_TYPE_ID = 'text-layer-typeid';

/**
 * Runtime settings service. This is used as a volatile cache for a few settings
 * calculated at runtime.
 */
@Injectable({
  providedIn: 'root'
})
export class RuntimeSettingsService {
  private _data: any;

  constructor(private _facetService: FacetService) {
    this._data = {};
  }

  public load() {
    this._data = {};

    this._facetService
      .getTextLayerPartTypeId()
      .pipe(
        take(1),
        retry(3)
      )
      .subscribe(r => {
        this.set(RS_TEXT_LAYER_TYPE_ID, r.typeId);
      });
  }

  public set(key: string, value: any) {
    this._data[key] = value;
  }

  public get<T>(key: string, defaultValue: T = null): T {
    return this._data[key] || defaultValue;
  }
}
