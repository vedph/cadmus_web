import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { User, UserFilter, DataPage, GravatarService } from '@cadmus/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { USERS_PAGINATOR } from './users.paginator';
import { UsersState } from './users.store';
import { UserService, AccountService } from '@cadmus/api';
import { DialogService } from '@cadmus/ui';
import { startWith, tap, switchMap, map } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from './users.service';
import { UsersQuery } from './users.query';

@Component({
  selector: 'cadmus-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  public pagination$: Observable<PaginationResponse<User>>;
  public filter$: BehaviorSubject<UserFilter>;
  public pageSize: FormControl;
  public active$: Observable<User>;

  constructor(
    @Inject(USERS_PAGINATOR) public paginator: PaginatorPlugin<UsersState>,
    private _userService: UserService,
    private _usersService: UsersService,
    private _usersQuery: UsersQuery,
    private _accountService: AccountService,
    private _dialogService: DialogService,
    private _gravatarService: GravatarService,
    private _snackbar: MatSnackBar,
    formBuilder: FormBuilder
  ) {
    this.pageSize = formBuilder.control(20);
    // https://netbasal.com/manage-your-entities-with-akita-like-a-boss-768732f8d4d1
    this.active$ = this._usersQuery.selectActive();
  }

  private getRequest(
    filter: UserFilter
  ): () => Observable<PaginationResponse<User>> {
    return () =>
      this._userService.getUsers(filter).pipe(
        // adapt server results to the paginator plugin
        map((p: DataPage<User>) => {
          return {
            currentPage: p.pageNumber,
            perPage: p.pageSize,
            lastPage: p.pageCount,
            data: p.items,
            total: p.total
          };
        })
      );
  }

  ngOnInit() {
    // filter
    const initialPageSize = 20;
    this.filter$ = new BehaviorSubject<UserFilter>(
      this.paginator.metadata.get('filter') || {
        pageNumber: 1,
        pageSize: initialPageSize
      }
    );
    this.pageSize.setValue(initialPageSize);

    // combine and get latest:
    // -page number changes from paginator
    // -page size changes from control
    // -filter changes from filter (in this case, clearing the cache)
    this.pagination$ = combineLatest([
      this.paginator.pageChanges,
      this.pageSize.valueChanges.pipe(
        // we are required to emit at least the initial value
        // as combineLatest emits only if ALL observables have emitted
        startWith(initialPageSize),
        // clear the cache when page size changes
        tap(_ => {
          this.paginator.clearCache();
        })
      ),
      this.filter$.pipe(
        // clear the cache when filters changed
        tap(_ => {
          this.paginator.clearCache();
        })
      )
    ]).pipe(
      // for each emitted value, combine into a filter and use it
      // to request the page from server
      switchMap(([pageNumber, pageSize, filter]) => {
        filter.pageNumber = pageNumber;
        filter.pageSize = pageSize;
        const request = this.getRequest(filter);
        // update saved filters
        this.paginator.metadata.set('filter', filter);
        return this.paginator.getPage(request);
      })
    );
  }

  public getGravatarUrl(email: string, size = 80) {
    return this._gravatarService.buildGravatarUrl(email, size);
  }

  public pageChanged(event: PageEvent) {
    // https://material.angular.io/components/paginator/api
    this.paginator.setPage(event.pageIndex + 1);
    if (event.pageSize !== this.pageSize.value) {
      this.pageSize.setValue(event.pageSize);
    }
  }

  public deleteUser(user: User) {
    this._dialogService
      .confirm('Confirm Deletion', `Delete user "${user.userName}"?`)
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
        this._usersService.deleteUser(user.userName);
      });
  }

  public setActiveUser(user: User) {
    this._usersService.setActive(user.userName);
  }

  public resetActiveUser() {
    this._usersService.setActive(null);
  }

  public saveActiveUser(user: User) {
    this._usersService.updateActive(user);
  }
}
