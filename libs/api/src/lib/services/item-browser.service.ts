import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorService, EnvService, ItemInfo, DataPage } from '@cadmus/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemBrowserService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  /**
   * Get the array of items browser IDs registered in the server.
   *
   * @returns Observable with strings array.
   */
  public getBrowserIds(): Observable<string[]> {
    return this._http
      .get<string[]>(`${this._env.apiUrl}browser-ids`)
      .pipe(retry(3), catchError(this._error.handleError));
  }

  /**
   * Get the specified page of items from the specified items browser.
   *
   * @param browserId The items browser ID.
   * @param pageNumber The items page number.
   * @param pageSize The items page size.
   * @param filters The filters object.
   */
  public getItems(
    browserId: string,
    pageNumber: number,
    pageSize: number,
    filters: any
  ): Observable<DataPage<ItemInfo>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', pageNumber.toString());
    httpParams = httpParams.set('pageSize', pageSize.toString());

    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, filters[key]);
      }
    }

    return this._http
      .get<DataPage<ItemInfo>>(
        `${this._env.apiUrl}${this._env.databaseId}/items-browser/${browserId}`,
        {
          params: httpParams
        }
      )
      .pipe(retry(3), catchError(this._error.handleError));
  }
}
