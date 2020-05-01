import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import {
  ItemInfo,
  User,
  DataPage,
  ErrorWrapper,
  FlagDefinition,
  FacetDefinition
} from '@cadmus/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { DialogService } from '@cadmus/ui';
import { Router } from '@angular/router';
import { ITEMS_SEARCH_PAGINATOR } from '../services/items-search-paginator';
import { ItemsSearchState } from '../state/items-search.store';
import { ItemService, AuthService } from '@cadmus/api';
import { ItemsSearchService } from '../services/items-search.service';
import { startWith, tap, switchMap, map } from 'rxjs/operators';
import { ItemsSearchQuery } from '../state/items-search.query';
import { PageEvent } from '@angular/material/paginator';
import { AppQuery } from '@cadmus/features/edit-state';

@Component({
  selector: 'cadmus-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {
  public pagination$: Observable<PaginationResponse<ItemInfo>>;
  public query$: Observable<string>;
  public flagDefinitions$: Observable<FlagDefinition[]>;
  public facetDefinitions$: Observable<FacetDefinition[]>;
  public pageSize: FormControl;
  public user: User;
  public userLevel: number;
  public error?: string;
  public lastQueries: string[];

  constructor(
    @Inject(ITEMS_SEARCH_PAGINATOR)
    public paginator: PaginatorPlugin<ItemsSearchState>,
    private _itemService: ItemService,
    private _itemSearchService: ItemsSearchService,
    private _itemsSearchQuery: ItemsSearchQuery,
    private _dialogService: DialogService,
    private _router: Router,
    private _authService: AuthService,
    private _appQuery: AppQuery,
    formBuilder: FormBuilder
  ) {
    this.pageSize = formBuilder.control(20);
    this.lastQueries = [];
  }

  private getRequest(
    query: string,
    pageNumber: number,
    pageSize: number
  ): () => Observable<PaginationResponse<ItemInfo>> {
    return () =>
      this._itemService.searchItems(query, pageNumber, pageSize).pipe(
        // adapt server results to the paginator plugin
        map((w: ErrorWrapper<DataPage<ItemInfo>>) => {
          if (w.error) {
            this.error = w.error;
            return {
              currentPage: 1,
              perPage: pageSize,
              lastPage: 0,
              data: [],
              total: 0
            };
          }
          this.error = null;
          const p = w.value;
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

  ngOnInit(): void {
    this._authService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.userLevel = this._authService.getCurrentUserLevel();
    });

    this.flagDefinitions$ = this._appQuery.selectFlags();
    this.facetDefinitions$ = this._appQuery.selectFacets();

    const initialPageSize = 20;
    this.query$ = this._itemsSearchQuery.selectQuery();
    this.pageSize.setValue(initialPageSize);

    // combine and get latest:
    // -page number changes from paginator
    // -page size changes from control
    // -query changes (in this case, clearing the cache)
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
      this.query$.pipe(
        // clear the cache when filters changed
        tap(_ => {
          this.paginator.clearCache();
        })
      )
    ]).pipe(
      // for each emitted value, combine into a filter and use it
      // to request the page from server
      switchMap(([pageNumber, pageSize, query]) => {
        const request = this.getRequest(query, pageNumber, pageSize);
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

  public submitQuery(query: string) {
    if (!query) {
      return;
    }
    if (!this.lastQueries.includes(query)) {
      this.lastQueries.splice(0, 0, query);
    }
    this._itemSearchService.updateQuery(query);
  }

  public editItem(item: ItemInfo) {
    this._router.navigate(['/items', item.id]);
  }

  public deleteItem(item: ItemInfo) {
    if (this.user.roles.every(r => r !== 'admin' && r !== 'editor')) {
      return;
    }

    this._dialogService
      .confirm('Confirm Deletion', `Delete item "${item.title}"?`)
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
        this._itemSearchService.delete(item.id);
      });
  }
}
