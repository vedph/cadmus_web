import { AuthStore } from './auth.store';
import { AuthState } from './auth.store';
import { Query, toBoolean } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  public isLoggedIn$ = this.select(state => toBoolean(state.user));
  public validating$ = this.select(state => state.validating);
  public error$ = this.select(state => state.error);

  constructor(protected store: AuthStore) {
    super(store);
  }
}
