import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
   * @returns Tag set.
   */
  public getThesaurus(id: string): Observable<Thesaurus> {
    const url =
      `${this._apiEndpoint}${this._databaseId}` +
      `/thesauri/${encodeURIComponent(id)}`;
    return this._http.get<Thesaurus>(url).pipe(
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
}
