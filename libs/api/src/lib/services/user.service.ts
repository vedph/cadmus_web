import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService, UserInfo } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    @Inject('apiEndpoint') private _apiEndpoint: string
  ) {}

  public getAllUsers(): Observable<UserInfo[]> {
    return this._http
      .get<UserInfo[]>(`${this._apiEndpoint}/users`, {
        params: new HttpParams().set('pageNumber', '1')
      })
      .pipe(
        retry(3),
        catchError(this._error.handleError)
      );
  }
}
