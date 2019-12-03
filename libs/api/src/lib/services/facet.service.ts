import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService, FacetDefinition, PartDefinition } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class FacetService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    @Inject('apiEndpoint') private _apiEndpoint: string,
    @Inject('databaseId') private _databaseId: string
  ) {}

  /**
   * Get a list of facets.
   * @returns Observable<IFacet[]> Observable with facets array.
   */
  public getFacets(): Observable<FacetDefinition[]> {
    const url = `${this._apiEndpoint}${this._databaseId}/facets`;

    return this._http.get<FacetDefinition[]>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Get a list of all the parts defined in all the facets. This is useful
   * when the UI requires a list of items parts, assuming that all the parts used
   * in a database should occur at least 1 time in any of the defined facets.
   * @param boolean noRoles True to ignore the roles when collecting parts from
   *  facets. In this case, you will get just 1 part for each part type.
   * @returns Observable<IFacet[]> Observable with facets array.
   */
  public getFacetParts(
    noRoles = false
  ): Observable<PartDefinition[]> {
    let url = `${this._apiEndpoint}${this._databaseId}/facets/parts`;
    if (noRoles) {
      url += '?noRoles=true';
    }

    return this._http.get<PartDefinition[]>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }
}
