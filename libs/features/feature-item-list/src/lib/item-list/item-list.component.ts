import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { ItemInfo, DataPage, ItemFilter } from '@cadmus/core';
import { ITEMS_PAGINATOR } from '../services/items-paginator';
import { map, switchMap, tap } from 'rxjs/operators';
import { ItemsState } from '../state/items.store';
import { PageEvent } from '@angular/material';
import { ItemService } from '@cadmus/api';
import { DialogService } from '@cadmus/ui';

@Component({
  selector: 'cadmus-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  public pagination$: Observable<PaginationResponse<ItemInfo>>;
  public filter$: BehaviorSubject<ItemFilter>;

  constructor(
    @Inject(ITEMS_PAGINATOR) public paginator: PaginatorPlugin<ItemsState>,
    private _itemsService: ItemService,
    private _dialogService: DialogService
  ) {}

  private getRequest(
    filter: ItemFilter
  ): () => Observable<PaginationResponse<ItemInfo>> {
    return () =>
      this._itemsService.getItems('cadmus', filter).pipe(
        // adapt server results to the paginator plugin
        map((p: DataPage<ItemInfo>) => {
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
    this.filter$ = new BehaviorSubject<ItemFilter>(
      this.paginator.metadata.get('filter') || {
        pageNumber: 1,
        pageSize: 20
      }
    );

    // combine and get latest:
    // -page number changes from paginator
    // -filter changes from filter (in this case, clearing the cache)
    this.pagination$ = combineLatest([
      this.paginator.pageChanges,
      this.filter$.pipe(
        // clear the cache when filters changed
        tap(_ => this.paginator.clearCache())
      )
    ]).pipe(
      // for each emitted value, combine into a filter and use it
      // to request the page from server
      switchMap(([pageNumber, filter]) => {
        filter.pageNumber = pageNumber;
        filter.pageSize = 20;
        const request = this.getRequest(filter);
        // update saved filters
        this.paginator.metadata.set('filter', filter);
        return this.paginator.getPage(request);
      })
    );

    // this.paginator.pageChanges.pipe(
    //   switchMap((page: number) => {
    //     const request = () =>
    //       this._itemsService
    //         .getItems('cadmus', {
    //           pageNumber: page,
    //           pageSize: 20
    //           // TODO: params
    //         })
    //         .pipe(
    //           // adapt server results to the paginator plugin
    //           map((p: DataPage<ItemInfo>) => {
    //             return {
    //               currentPage: p.pageNumber,
    //               perPage: p.pageSize,
    //               lastPage: p.pageCount,
    //               data: p.items,
    //               total: p.total
    //             };
    //           })
    //         );
    //     return this.paginator.getPage(request);
    //   })
    // );

    // items pagination
    // this.pagination$ = this.paginator.pageChanges.pipe(
    //   switchMap((page: number) => {
    //     const request = () =>
    //       this._itemsService
    //         .getItems('cadmus', {
    //           pageNumber: page,
    //           pageSize: 20
    //           // TODO: params
    //         })
    //         .pipe(
    //           // adapt server results to the paginator plugin
    //           map((p: DataPage<ItemInfo>) => {
    //             return {
    //               currentPage: p.pageNumber,
    //               perPage: p.pageSize,
    //               lastPage: p.pageCount,
    //               data: p.items,
    //               total: p.total
    //             };
    //           })
    //         );
    //     return this.paginator.getPage(request);
    //   })
    // );

    // TODO: init lookup data from other stores (users, facets, flags)
  }

  public pageChanged(event: PageEvent) {
    // https://material.angular.io/components/paginator/api
    this.paginator.setPage(event.pageIndex + 1);
    // TODO: change size with event.pageSize
  }

  public editItem(item: ItemInfo) {
    // TODO: navigate to editor
  }

  public deleteItem(item: ItemInfo) {
    this._dialogService
      .confirm('Confirm Deletion', `Delete item "${item.title}"?`)
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
        // TODO: delete
      });
  }
}
