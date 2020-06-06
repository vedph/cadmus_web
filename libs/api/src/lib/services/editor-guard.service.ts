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
export class EditorGuardService implements CanActivate {
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
      this._router.navigate(['/login']);
      console.warn('User not verified');
      return false;
    }
    // else activate only if admin/editor
    const user = this._authService.currentUserValue;
    const ok = user && user.roles.some((r) => r === 'admin' || r === 'editor');
    if (!ok) {
      console.warn('Unauthorized user');
    }
    return ok;
  }
}
