import { Injectable } from '@angular/core';
import { AuthStore } from '../state/auth.store';
import { AuthService, RuntimeSettingsService } from '@cadmus/api';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private _authStore: AuthStore,
    private _authService: AuthService,
    private _settingsService: RuntimeSettingsService,
    private _router: Router
  ) {}

  public login(name: string, password: string, returnUrl: string = null) {
    this._authStore.update({ validating: true });

    this._authService
      .login(name, password)
      .pipe(
        catchError(error => {
          console.error(error);
          this._authStore.error('Invalid login');
          return of(error);
        })
      )
      .subscribe(user => {
        this._authStore.login(user);
        // load runtime settings once logged in
        this._settingsService.load();
        this._router.navigate([returnUrl || '/']);
      });
  }

  public logout() {
    this._authStore.logout();
    this._router.navigate(['/login']);
  }
}
