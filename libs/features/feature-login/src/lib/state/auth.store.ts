import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from '@cadmus/core';
import { STORAGE_AUTH_USER_KEY } from '@cadmus/api';

export interface AuthState {
  user?: User;
  validating?: boolean;
  error?: string;
}

export const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(STORAGE_AUTH_USER_KEY)) || null,
  validating: false,
  error: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(initialState);
  }

  public login(user: User) {
    this.update({
      user: user,
      validating: false,
      error: null
    });
  }

  public error(error: string) {
    this.update({
      user: null,
      validating: false,
      error: error
    });
  }

  public logout() {
    this.update(initialState);
  }
}
