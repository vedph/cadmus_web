import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from '@cadmus/core';
import { STORAGE_AUTH_USER_KEY } from '@cadmus/api';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(STORAGE_AUTH_USER_KEY)) || null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(initialState);
  }

  public login(user: User) {
    this.update({ user });
  }

  public logout() {
    this.update(initialState);
  }
}
