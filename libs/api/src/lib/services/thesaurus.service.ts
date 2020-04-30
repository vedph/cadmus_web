import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService, Thesaurus, ThesauriSet, EnvService } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class ThesaurusService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  /**
   * Get the list of thesauri IDs.
   * @returns Observable<string> Array of IDs.
   */
  public getThesaurusIds(): Observable<string[]> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/thesauri-ids`;
    return this._http
      .get<string[]>(url)
      .pipe(retry(3), catchError(this._error.handleError));
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
      `${this._env.apiUrl}${this._env.databaseId}` +
      `/thesauri/${encodeURIComponent(id)}`;
    return this._http
      .get<Thesaurus>(url, {
        params: httpParams
      })
      .pipe(retry(3), catchError(this._error.handleError));
  }

  /**
   * Get the requested thesauri in a batch.
   * @param ids The IDs of the requested thesauri.
   * @returns An object where each key is the purged thesaurus ID with value
   * equal to the thesaurus model.
   */
  public getThesauri(ids: string[]): Observable<ThesauriSet> {
    const url =
      `${this._env.apiUrl}${this._env.databaseId}` +
      `/thesauri-set/${encodeURIComponent(ids.join(','))}?purgeIds=true`;
    return this._http
      .get<ThesauriSet>(url)
      .pipe(retry(3), catchError(this._error.handleError));
  }

  /**
   * Add or update the specified thesaurus.
   *
   * @param thesaurus The thesaurus.
   */
  public addThesaurus(thesaurus: Thesaurus): Observable<any> {
    const url = `${this._env.apiUrl}${this._env.databaseId}` + `/thesauri`;
    return this._http
      .post(url, thesaurus)
      .pipe(retry(3), catchError(this._error.handleError));
  }

  /**
   * Delete the specified thesaurus.
   *
   * @param id The thesaurus ID.
   */
  public deleteThesaurus(id: string): Observable<any> {
    const url =
      `${this._env.apiUrl}${this._env.databaseId}` + `/thesauri/${id}`;
    return this._http
      .delete<Thesaurus>(url)
      .pipe(retry(3), catchError(this._error.handleError));
  }

  /**
   * Get the thesaurus scoped ID from the corresponding non-scoped thesaurus ID
   * and the specified scope ID. This just suffixes the thesaurus ID with
   * the scope ID prefixed by a dot, before the language ID. For instance,
   * a thesaurus ID "witnesses@en" with a scope ID "lucr" would become
   * "witnesses.lucr@en". If the thesaurus ID starts with an exclamation mark,
   * which means that it must not be scoped, this function will return it
   * without the leading mark.
   *
   * @param id The thesaurus ID.
   * @param scopeId The scope ID, or null when you just want to strip off
   * the leading exclamation mark if any.
   */
  public getScopedId(id: string, scopeId: string): string {
    // an ID starting with ! should not be scoped
    if (id.startsWith('!')) {
      return id.substr(1);
    }
    // just ret the ID if we were just requested to strip the initial !
    if (!scopeId) {
      return id;
    }

    const i = id.lastIndexOf('@');
    if (i === -1) {
      return id + '.' + scopeId;
    }
    return id.substr(0, i) + '.' + scopeId + id.substr(i);
  }

  /**
   * Get the unscoped thesaurus ID from the specified ID, also stripping
   * any language suffix off and any leading "!". For instance, an ID like
   * "apparatus-witnesses.verg-eclo@en" becomes "apparatus-witnesses".
   *
   * @param id The thesaurus ID.
   */
  public getUnscopedId(id: string): string {
    if (id.startsWith('!')) {
      id = id.substr(1);
    }
    let i = id.lastIndexOf('.');
    if (i > 0) {
      id = id.substr(0, i);
    }

    i = id.lastIndexOf('@');
    if (i > -1) {
      id = id.substr(0, i);
    }
    return id;
  }
}
