// https://angular.io/docs/ts/latest/guide/router.html
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) {}

  private redirectToLogin(url: string) {
    this._router.navigate(['/login'], {
      queryParams: {
        returnUrl: url,
      },
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if not authenticated, redirect to login
    if (!this._authService.isAuthenticated(false)) {
      this.redirectToLogin(state.url);
      return false;
    }
    // if authenticated but not verified, redirect to login
    if (!this._authService.currentUserValue.emailConfirmed) {
      this.redirectToLogin(state.url);
      console.warn('User not verified');
      return false;
    }
    return true;
  }
}
