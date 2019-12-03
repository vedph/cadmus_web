import { AuthStore } from './auth.store';
import { AuthState } from './auth.store';
import { Query, toBoolean } from '@datorama/akita';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthQuery extends Query<AuthState> {

  isLoggedIn$ = this.select(state => toBoolean(state.user));

  constructor(protected store: AuthStore) {
    super(store);
  }
}
