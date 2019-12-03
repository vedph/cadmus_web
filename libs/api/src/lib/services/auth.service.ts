import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import {
  User,
  ErrorService,
  LocalStorageService,
  LoginResult,
  RegistrationModel
} from '@cadmus/core';

// https://github.com/cornflourblue/angular-7-registration-login-example-cli/blob/master/src/app/_services/authentication.service.ts

export const STORAGE_AUTH_USER_KEY = 'cadmus.auth.user';
export const STORAGE_AUTH_TOKEN_KEY = 'cadmus.auth.token';

/**
 * Authentication service.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUserSubject: BehaviorSubject<User>;

  /**
   * The current user observable.
   */
  public currentUser$: Observable<User>;

  /**
   * The current user latest value.
   */
  public get currentUserValue(): User {
    return this._currentUserSubject.value;
  }

  constructor(
    private _http: HttpClient,
    private _localStorage: LocalStorageService,
    @Inject('apiEndpoint') private _apiEndpoint: string
  ) {
    this._currentUserSubject = new BehaviorSubject<User>(
      _localStorage.retrieve<User>(STORAGE_AUTH_USER_KEY, true)
    );
    this.currentUser$ = this._currentUserSubject.asObservable();
  }

  /**
   * Logs the specified user in.
   * @param name: user name.
   * @param password: password.
   */
  public login(name: string, password: string): Observable<User> {
    return this._http
      .post<any>(
        this._apiEndpoint + `auth/login`,
        {
          Username: name,
          Password: password
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      )
      .pipe(
        map((result: LoginResult) => {
          const helper = new JwtHelperService();
          const token = helper.decodeToken(result.token);
          this._localStorage.store(STORAGE_AUTH_TOKEN_KEY, result, true);
          // get user info from token
          const user: User = {
            userName:
              token[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
              ],
            email:
              token[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
              ],
            roles:
              token[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
              ],
            isVerified: token.vfd,
            firstName:
              token[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
              ],
            lastName:
              token[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
              ]
          };
          this._currentUserSubject.next(user);
          return user;
        })
      );
  }

  /**
   * Logs out the current user if any.
   */
  public logout() {
    this._localStorage.remove(STORAGE_AUTH_USER_KEY, true);
    this._localStorage.remove('id_token');
    this._currentUserSubject.next(null);
    const options = {
      headers: this.createAuthHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(this._apiEndpoint + 'auth/logout', options);
  }

  /**
   * True it the user is authenticated, and eventually verified.
   * @param verifiedOnly true to return true only if the user is verified.
   * @returns true if authenticated (and eventually verified).
   */
  public isAuthenticated(verifiedOnly: boolean): boolean {
    if (!this.currentUserValue) {
      return false;
    }

    // check token expiration
    const result: LoginResult = this._localStorage.retrieve(
      STORAGE_AUTH_TOKEN_KEY,
      true
    );
    if (!result) {
      return false;
    }
    if (result.expiration) {
      if (this.getUTCDate().valueOf() - result.expiration.valueOf() < 60) {
        return false;
      }
    }

    // check confirmation, if requested
    if (!verifiedOnly) {
      return true;
    }
    return this.currentUserValue.isVerified;
  }

  /**
   * Update data about the current user.
   * @param user user data.
   */
  public updateCurrentUser(user: User) {
    this._localStorage.store(STORAGE_AUTH_USER_KEY, user, true);
  }

  /**
   * Checks if the current user is in the specified role.
   * @param role The role to check for.
   */
  public isCurrentUserInRole(role: string) {
    const user = this.currentUserValue;
    if (!user || !user.roles) {
      return false;
    }
    return user.roles.indexOf(role) > -1;
  }

  /**
   * Checks if the specified email address is registered on the server.
   * @param email email address to test.
   * @returns result.
   */
  public isEmailRegistered(email: string): Observable<object> {
    const options = {
      headers: this.createAuthHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(
      this._apiEndpoint + 'accounts/emailexists/' + encodeURIComponent(email),
      options
    );
  }

  /**
   * Checks if the specified user's given name is registered on the server.
   * This name is a nickname chosen by users during registration, and is the key
   * used for referencing users when talking to the server.
   * @param name name to test.
   * @returns result.
   */
  public isNameRegistered(name: string): Observable<object> {
    const options = {
      headers: this.createAuthHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(
      this._apiEndpoint + 'accounts/nameexists/' + encodeURIComponent(name),
      options
    );
  }

  /**
   * Register the user with the specified registration data.
   * @param registration The registration data.
   */
  public register(registration: RegistrationModel): Observable<object> {
    const options = {
      headers: this.createAuthHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(
      this._apiEndpoint + 'accounts/register',
      registration,
      options
    );
  }

  /**
   * Resend the confirmation email to the specified address.
   * @param email address.
   */
  public resendConfirmEmail(email: string): Observable<object> {
    const options = {
      headers: this.createAuthHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get(
      this._apiEndpoint + 'accounts/resendconfirm/' + encodeURIComponent(email),
      options
    );
  }

  /**
   * Change the specified user password.
   * @param email Email address.
   * @param oldPassword The old password.
   * @param newPassword The new password.
   */
  public changePassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Observable<object> {
    return this._http.post(this._apiEndpoint + 'accounts/changepassword', {
      email,
      oldPassword,
      newPassword
    });
  }

  /**
   * Request a password reset for the specified email address.
   * @param email Email address.
   */
  public requestPasswordReset(email: string): Observable<object> {
    return this._http.post(
      this._apiEndpoint + 'accounts/resetpassword/request',
      { email }
    );
  }

  /**
   * Create headers with bearer authentication. You can use this method as a shortcut
   * for building headers for authenticated requests.
   * @param headers content of headers to be merged
   * with the authentication headers.
   * @returns headers.
   */
  public createAuthHeaders(headers?: { [name: string]: any }): HttpHeaders {
    // create headers
    const auth = new HttpHeaders();
    if (headers) {
      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          auth.append(key, headers[key]);
        }
      }
    }

    // append authentication
    const loginResult: LoginResult = this._localStorage.retrieve(
      STORAGE_AUTH_TOKEN_KEY,
      true
    );
    if (loginResult) {
      auth.append('Authorization', 'Bearer ' + loginResult.token);
    }
    return auth;
  }

  /**
   * Get the Authorization header value.
   * @returns string The value for the Authorization header, or empty string if not authorized.
   */
  public getAuthHeader(): string {
    const loginResult: LoginResult = this._localStorage.retrieve(
      STORAGE_AUTH_TOKEN_KEY,
      true
    );
    if (!loginResult) {
      return '';
    }
    return 'Bearer ' + loginResult.token;
  }

  /**
   * Gets the UTC date from the specified local date.
   * @param date local date
   */
  private getUTCDate(date?: Date): Date {
    if (!date) {
      date = new Date();
    }
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
  }
}
