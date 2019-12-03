import { Injectable } from '@angular/core';
import { AuthStore } from '../state/auth.store';
import { AuthService } from '@cadmus/api';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private _authStore: AuthStore,
    private _authService: AuthService,
    private _router: Router
  ) {}

  public login(name: string, password: string) {
    this._authService.login(name, password).subscribe(user => {
      this._authStore.login(user);
      this._router.navigate(['/']);
    });
  }

  public logout() {
    this._authStore.logout();
    this._router.navigate(['/login']);
  }
}
