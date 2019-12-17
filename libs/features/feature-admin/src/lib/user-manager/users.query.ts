import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UsersState, UsersStore } from './users.store';
import { User } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState, User, string> {
  constructor(protected store: UsersStore) {
    super(store);
  }

  /**
   * Remove the user with the specified ID from the store.
   * @param id The user's ID.
   */
  public delete(id: string) {
    this.store.remove(id);
  }
}
