import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService, UserInfo, DataPage, UserFilter, EnvService } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  public getAllUsers(): Observable<DataPage<UserInfo>> {
    return this._http
      .get<DataPage<UserInfo>>(`${this._env.apiUrl}users`, {
        params: new HttpParams().set('pageNumber', '1')
      })
      .pipe(
        retry(3),
        catchError(this._error.handleError)
      );
  }

  public getUsers(filter: UserFilter): Observable<DataPage<UserInfo>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', filter.pageNumber.toString());
    httpParams = httpParams.set('pageSize', filter.pageSize.toString());
    if (filter.name) {
      httpParams = httpParams.set('name', filter.name);
    }

    return this._http
      .get<DataPage<UserInfo>>(`${this._env.apiUrl}users`, {
        params: httpParams
      })
      .pipe(
        retry(3),
        catchError(this._error.handleError)
      );
  }
}
