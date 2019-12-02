import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { ItemInfo, DataPage } from '@cadmus/core';
import { ITEMS_PAGINATOR } from '../services/items-paginator';
import { ItemsService } from '../services/items.service';
import { map, switchMap } from 'rxjs/operators';
import { ItemsState } from '../state/items.store';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'cadmus-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  public pagination$: Observable<PaginationResponse<ItemInfo>>;

  constructor(
    @Inject(ITEMS_PAGINATOR) public paginator: PaginatorPlugin<ItemsState>,
    private _itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.pagination$ = this.paginator.pageChanges.pipe(
      switchMap((page: number) => {
        const request = () =>
          this._itemsService
            .getItems('cadmus', {
              pageNumber: page,
              pageSize: 20
              // TODO: params
            })
            .pipe(
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
        return this.paginator.getPage(request);
      })
    );
  }

  public pageChanged(event: PageEvent) {
    // https://material.angular.io/components/paginator/api
    this.paginator.setPage(event.pageIndex + 1);
    // TODO: change size with event.pageSize
  }
}
