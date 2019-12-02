import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService, FlagDefinition } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class FlagService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    @Inject('apiEndpoint') private _apiEndpoint: string
  ) {}

  public getFlags(databaseId: string): Observable<FlagDefinition[]> {
    const url = `${this._apiEndpoint}${databaseId}/flags`;

    return this._http.get<FlagDefinition[]>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }
}
