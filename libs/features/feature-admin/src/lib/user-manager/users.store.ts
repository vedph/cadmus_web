import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { User } from '@cadmus/core';
import { Injectable } from '@angular/core';

export interface UsersState extends EntityState<User, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'items' })
export class UsersStore extends EntityStore<User> {
  constructor() {
    super({});
  }
}
