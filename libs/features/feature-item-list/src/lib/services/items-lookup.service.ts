import { Injectable, Inject } from '@angular/core';
import { ItemsLookupStore } from '../state/items-lookup.store';
import { FlagService, FacetService, UserService } from '@cadmus/api';
import { DataPage, UserInfo } from '@cadmus/core';

@Injectable({ providedIn: 'root' })
export class ItemsLookupService {
  constructor(
    private _facetService: FacetService,
    private _flagService: FlagService,
    private _userService: UserService,
    private _store: ItemsLookupStore,
    @Inject('databaseId') private _databaseId: string
  ) {}

  private loadFacets() {
    this._facetService.getFacets(this._databaseId).subscribe(
      facets => {
        this._store.update(state => {
          return {
            ...state,
            facets: facets
          };
        });
      },
      err => {
        this._store.setError(err);
      }
    );
  }

  private loadFlags() {
    this._flagService.getFlags(this._databaseId).subscribe(
      flags => {
        this._store.update(state => {
          return {
            ...state,
            flags: flags
          };
        });
      },
      err => {
        this._store.setError(err);
      }
    );
  }

  private loadUsers() {
    this._userService.getAllUsers().subscribe(
      (page: DataPage<UserInfo>) => {
        this._store.update(state => {
          return {
            ...state,
            users: page.items.map(u => {
              return {
                id: u.userName,
                firstName: u.firstName,
                lastName: u.lastName
              };
            })
          };
        });
      },
      err => {
        this._store.setError(err);
      }
    );
  }

  public load() {
    this.loadFacets();
    this.loadFlags();
    this.loadUsers();
  }
}
