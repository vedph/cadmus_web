import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { User } from '@cadmus/core';
import { Injectable } from '@angular/core';

export interface UsersState extends EntityState<User, string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users', idKey: 'userName' })
export class UsersStore extends EntityStore<EntityState<User>, User, string> {
  constructor() {
    super({});
  }
}
