import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService, FlagDefinition, EnvService } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class FlagService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  public getFlags(): Observable<FlagDefinition[]> {
    const url = `${this._env.apiUrl}${this._env.databaseId}/flags`;

    return this._http.get<FlagDefinition[]>(url).pipe(
      retry(3),
      catchError(this._error.handleError)
    );
  }
}
