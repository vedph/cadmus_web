import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService, User, PasswordChange, EnvService } from '@cadmus/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  /**
   * Get the top N users matching the specified name filter.
   * @param nameFilter The user name filter.
   * @param limit The maximum number of users to get.
   */
  public getTopUsers(nameFilter: string, limit = 10): Observable<User[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', '1');
    httpParams = httpParams.set('pageSize', limit.toString());
    if (nameFilter) {
      httpParams = httpParams.set('name', nameFilter);
    }
    const options =
      httpParams.keys().length > 0
        ? {
            params: httpParams
          }
        : {};

    return this._http
      .get<User[]>(this._env.apiUrl + 'users', options)
      .pipe(
        retry(3),
        catchError(this._error.handleError)
      );
  }

  /**
   * Get information about all the users listed in the specified names.
   * @param names User(s) names.
   */
  public getUsersFromNames(names: string[]): Observable<User[]> {
    let httpParams = new HttpParams();
    if (names && names.length > 0) {
      httpParams = httpParams.set('names', names.join(','));
    }
    const options =
      httpParams.keys().length > 0
        ? {
            params: httpParams
          }
        : {};

    return this._http
      .get<User[]>(this._env.apiUrl + 'users-from-names', options)
      .pipe(
        retry(3),
        catchError(this._error.handleError)
      );
  }

  /**
   * Get data about the specified user.
   * @param name The user name.
   */
  public getUser(name: string): Observable<User> {
    return this._http
      .get<User>(this._env.apiUrl + 'users/' + name)
      .pipe(
        retry(3),
        catchError(this._error.handleError)
      );
  }

  /**
   * Update the editable data for the specified user.
   * @param user The user to update.
   */
  public updateUser(user: User): Observable<any> {
    return this._http
      .put(this._env.apiUrl + 'users', user)
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Request a password reset email for the specified email address.
   * @param email The email address to receive the reset message.
   */
  public resetPassword(email: string): Observable<any> {
    return this._http
      .post(this._env.apiUrl + 'accounts/resetpassword/request', {
        email: email
      })
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Change the password.
   * @param change The password change data.
   */
  public changePassword(change: PasswordChange): Observable<any> {
    return this._http
      .post(this._env.apiUrl + 'accounts/changepassword', change)
      .pipe(catchError(this._error.handleError));
  }

  /**
   * Delete the user with the specified username.
   * @param name The user name.
   */
  public deleteUser(name: string): Observable<any> {
    return this._http
      .delete(this._env.apiUrl + 'accounts/' + name)
      .pipe(catchError(this._error.handleError));
  }
}
