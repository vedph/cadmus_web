import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorService, ItemFilter, ItemInfo, DataPage } from '@cadmus/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    @Inject('apiEndpoint') private _apiEndpoint: string
  ) {}

  /**
   * Get a page of items matching the specified filters.
   *
   * @param databaseId The database ID.
   * @param filter The items filter.
   * @returns Observable with paged result.
   */
  public getItems(
    databaseId: string,
    filter: ItemFilter
  ): Observable<DataPage<ItemInfo>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', filter.pageNumber.toString());
    httpParams = httpParams.set('pageSize', filter.pageSize.toString());
    if (filter.title) {
      httpParams = httpParams.set('title', filter.title);
    }
    if (filter.description) {
      httpParams = httpParams.set('description', filter.description);
    }
    if (filter.facetId) {
      httpParams = httpParams.set('facetId', filter.facetId);
    }
    if (filter.flags) {
      httpParams = httpParams.set('flags', filter.flags.toString());
    }
    if (filter.userId) {
      httpParams = httpParams.set('userId', filter.userId);
    }
    if (filter.minModified) {
      httpParams = httpParams.set(
        'minModified',
        filter.minModified.toISOString()
      );
    }
    if (filter.maxModified) {
      httpParams = httpParams.set(
        'maxModified',
        filter.maxModified.toISOString()
      );
    }

    return this._http
      .get<DataPage<ItemInfo>>(`${this._apiEndpoint}${databaseId}/items`, {
        params: httpParams
      })
      .pipe(
        retry(3),
        catchError(this._error.handleError)
      );
  }
}
