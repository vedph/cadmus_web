import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService, Thesaurus, ThesauriSet } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class ThesaurusService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    @Inject('apiEndpoint') private _apiEndpoint: string,
    @Inject('databaseId') private _databaseId: string
  ) {}

  /**
   * Get the list of thesauri IDs.
   * @returns Observable<string> Array of IDs.
   */
  public getThesaurusIds(): Observable<string[]> {
    const url = `${this._apiEndpoint}${this._databaseId}/thesauri`;
    return this._http.get<string[]>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Gets the tags set with the specified ID.
   * @param id string The tag set ID.
   * @param emptyIfNotFound True to return an empty thesaurus when the requested
   * thesaurus ID is not found, rather than getting a 404.
   * @returns Tag set.
   */
  public getThesaurus(
    id: string,
    emptyIfNotFound = false
  ): Observable<Thesaurus> {
    let httpParams = new HttpParams();
    if (emptyIfNotFound) {
      httpParams = httpParams.set('emptyIfNotFound', true.toString());
    }
    const url =
      `${this._apiEndpoint}${this._databaseId}` +
      `/thesauri/${encodeURIComponent(id)}`;
    return this._http.get<Thesaurus>(url, {
      params: httpParams
    }).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Get the requested thesauri in a batch.
   * @param ids The IDs of the requested thesauri.
   * @returns An object where each key is the thesaurus ID with value
   * equal to the thesaurus model.
   */
  public getThesauri(ids: string[]): Observable<ThesauriSet> {
    const url =
      `${this._apiEndpoint}${this._databaseId}` +
      `/thesauri-set/${encodeURIComponent(ids.join(','))}`;
    return this._http.get<ThesauriSet>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }

  /**
   * Get the thesaurus scoped ID from the corresponding non-scoped thesaurus ID
   * and the specified scope ID. This just suffixes the thesaurus ID with
   * the scope ID prefixed by a dot, before the language ID. For instance,
   * a thesaurus ID "witnesses@en" with a scope ID "lucr" would become
   * "witnesses.lucr@en".
   *
   * @param id The thesaurus ID.
   * @param scopeId The scope ID.
   */
  public getScopedId(id: string, scopeId: string): string {
    const i = id.lastIndexOf('@');
    if (i === -1) {
      return id + '.' + scopeId;
    }
    return id.substr(0, i) + '.' + scopeId + id.substr(i);
  }
}
