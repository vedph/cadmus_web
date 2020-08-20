import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import {
  ItemInfo,
  DataPage,
  ItemFilter,
  User,
  FlagDefinition,
  FacetDefinition,
} from '@cadmus/core';
import { ITEMS_PAGINATOR } from '../services/items-paginator';
import { map, switchMap, tap, startWith } from 'rxjs/operators';
import { ItemsState } from '../state/items.store';
import { PageEvent } from '@angular/material/paginator';
import { ItemService, AuthService } from '@cadmus/api';
import { DialogService } from '@cadmus/ui';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsListService } from '../services/items-list.service';
import { AppQuery } from '@cadmus/features/edit-state';

@Component({
  selector: 'cadmus-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  public pagination$: Observable<PaginationResponse<ItemInfo>>;
  public filter$: BehaviorSubject<ItemFilter>;
  public flagDefinitions$: Observable<FlagDefinition[]>;
  public facetDefinitions$: Observable<FacetDefinition[]>;
  public pageSize: FormControl;
  public user: User;
  public userLevel: number;
  private _refresh$: BehaviorSubject<number>;

  constructor(
    @Inject(ITEMS_PAGINATOR) public paginator: PaginatorPlugin<ItemsState>,
    private _itemsService: ItemService,
    private _itemListService: ItemsListService,
    private _dialogService: DialogService,
    private _router: Router,
    private _authService: AuthService,
    private _appQuery: AppQuery,
    formBuilder: FormBuilder
  ) {
    this.pageSize = formBuilder.control(20);
    this._refresh$ = new BehaviorSubject(0);
  }

  private getRequest(
    filter: ItemFilter
  ): () => Observable<PaginationResponse<ItemInfo>> {
    return () =>
      this._itemsService.getItems(filter).pipe(
        // adapt server results to the paginator plugin
        map((p: DataPage<ItemInfo>) => {
          return {
            currentPage: p.pageNumber,
            perPage: p.pageSize,
            lastPage: p.pageCount,
            data: p.items,
            total: p.total,
          };
        })
      );
  }

  ngOnInit() {
    this._authService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.userLevel = this._authService.getCurrentUserLevel();
    });

    this.flagDefinitions$ = this._appQuery.selectFlags();
    this.facetDefinitions$ = this._appQuery.selectFacets();

    // filter
    const initialPageSize = 20;
    this.filter$ = new BehaviorSubject<ItemFilter>(
      this.paginator.metadata.get('filter') || {
        pageNumber: 1,
        pageSize: initialPageSize,
      }
    );
    this.pageSize.setValue(initialPageSize);

    // combine and get latest:
    // -page number changes from paginator
    // -page size changes from control
    // -filter changes from filter (in this case, clearing the cache)
    // -refresh request (in this case, clearing the cache)
    this.pagination$ = combineLatest([
      this.paginator.pageChanges,
      this.pageSize.valueChanges.pipe(
        // we are required to emit at least the initial value
        // as combineLatest emits only if ALL observables have emitted
        startWith(initialPageSize),
        // clear the cache when page size changes
        tap((_) => {
          this.paginator.clearCache();
        })
      ),
      this.filter$.pipe(
        // clear the cache when filters changed
        tap((_) => {
          this.paginator.clearCache();
        })
      ),
      this._refresh$.pipe(
        // clear the cache when forcing refresh
        tap((_) => {
          this.paginator.clearCache();
        })
      ),
    ]).pipe(
      // for each emitted value, combine into a filter and use it
      // to request the page from server
      switchMap(([pageNumber, pageSize, filter, refresh]) => {
        filter.pageNumber = pageNumber;
        filter.pageSize = pageSize;
        const request = this.getRequest(filter);
        // update saved filters
        this.paginator.metadata.set('filter', filter);
        return this.paginator.getPage(request);
      })
    );
  }

  public pageChanged(event: PageEvent) {
    // https://material.angular.io/components/paginator/api
    this.paginator.setPage(event.pageIndex + 1);
    if (event.pageSize !== this.pageSize.value) {
      this.pageSize.setValue(event.pageSize);
    }
  }

  public addItem() {
    this._router.navigate(['/items', 'new']);
  }

  public editItem(item: ItemInfo) {
    this._router.navigate(['/items', item.id]);
  }

  public deleteItem(item: ItemInfo) {
    if (this.user.roles.every((r) => r !== 'admin' && r !== 'editor')) {
      return;
    }

    this._dialogService
      .confirm('Confirm Deletion', `Delete item "${item.title}"?`)
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
        // force a refresh once deletion has completed,
        // even if it failed (a refresh is useful in this case)
        this._itemListService.delete(item.id).then(
          (_) => {
            this._refresh$.next(new Date().getUTCMilliseconds());
          },
          (_) => {
            this._refresh$.next(new Date().getUTCMilliseconds());
          }
        );
      });
  }
}
