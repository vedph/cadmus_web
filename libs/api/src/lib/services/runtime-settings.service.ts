import { Injectable } from '@angular/core';

/**
 * Runtime settings service. This can be used as a volatile cache for settings.
 * Currently this is not used.
 */
@Injectable({
  providedIn: 'root'
})
export class RuntimeSettingsService {
  private _data: any;

  constructor() {
    this._data = {};
  }

  public load() {
    this._data = {};
  }

  public set(key: string, value: any) {
    this._data[key] = value;
  }

  public get<T>(key: string, defaultValue: T = null): T {
    return this._data[key] || defaultValue;
  }
}
