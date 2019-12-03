import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

// https://angular.io/guide/http
// https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _injector: Injector) {}

  /**
   * Intercept the specified HTTP request adding the Authorization header to it.
   * @param req HttpRequest<any> The original request.
   * @param next HttpHandler The next request handler.
   */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // get the auth header from the service
    // note that we do not inject the AuthService in constructor,
    // to avoid infinite recursion:
    // see https://github.com/angular/angular/issues/18224#issuecomment-316957213
    const auth = this._injector.get(AuthService);
    const authHeader = auth.getAuthHeader();
    if (!authHeader) {
      return next.handle(req);
    }

    // clone the request to add the new header
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authHeader)
    });
    // pass on the cloned request instead of the original request
    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    return next.handle(authReq).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // logout and redirect to the login route
              console.warn('Unauthorized request');
              auth.logout();
              const router = this._injector.get(Router);
              router.navigate(['login']);
            }
          }
        }
      )
    );
  }
}
