import { Injectable } from '@angular/core';
import { UsersStore } from './users.store';
import { AccountService } from '@cadmus/api';
import { User } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private _store: UsersStore,
    private _accountService: AccountService
  ) {}

  public setActive(name: string) {
    this._store.setActive(name);
  }

  public updateActive(user: User) {
    this._store.setLoading(true);

    this._accountService.updateUser(user).subscribe(
      _ => {
        this._store.setLoading(false);
        this._store.setError(null);
        this._store.updateActive(user);
      },
      error => {
        console.error(error);
        this._store.setLoading(false);
        this._store.setError('Error updating user');
      }
    );
  }

  public deleteUser(name: string) {
    this._store.setLoading(true);

    this._accountService.deleteUser(name).subscribe(
      _ => {
        this._store.setLoading(false);
        this._store.setError(null);
        this._store.remove(name);
      },
      error => {
        console.error(error);
        this._store.setLoading(false);
        this._store.setError('Error deleting user');
      }
    );
  }
}
