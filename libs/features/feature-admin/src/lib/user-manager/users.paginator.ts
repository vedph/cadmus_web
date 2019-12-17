import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { UsersQuery } from './users.query';

// create a factory provider for the items paginator
export const USERS_PAGINATOR = new InjectionToken('USERS_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const usersQuery = inject(UsersQuery);
    return new PaginatorPlugin(usersQuery).withControls().withRange();
  }
});
