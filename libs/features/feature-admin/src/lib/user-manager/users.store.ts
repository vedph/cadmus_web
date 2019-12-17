import {
  StoreConfig,
  EntityStore,
  EntityState,
  ActiveState
} from '@datorama/akita';
import { User } from '@cadmus/core';
import { Injectable } from '@angular/core';

// https://netbasal.gitbook.io/akita/entity-store/entity-store/active-state
export interface UsersState
  extends EntityState<User, string>,
    ActiveState<string> {
  active: string | null;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users', idKey: 'userName' })
export class UsersStore extends EntityStore<EntityState<User>, User, string> {
  constructor() {
    super({});
  }
}
