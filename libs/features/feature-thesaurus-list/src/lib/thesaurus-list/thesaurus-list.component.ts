import { Component, OnInit, Inject } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import {
  Thesaurus,
  ThesaurusFilter,
  User,
  DataPage,
  ItemFilter
} from '@cadmus/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { THESAURI_PAGINATOR } from '../services/thesauri-paginator';
import { ThesauriState } from '../state/thesauri.store';
import { ThesaurusService, AuthService } from '@cadmus/api';
import { ThesauriListService } from '../services/thesauri.service';
import { DialogService } from '@cadmus/ui';
import { Router } from '@angular/router';
import { map, startWith, tap, switchMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'cadmus-thesaurus-list',
  templateUrl: './thesaurus-list.component.html',
  styleUrls: ['./thesaurus-list.component.css']
})
export class ThesaurusListComponent implements OnInit {
  public pagination$: Observable<PaginationResponse<Thesaurus>>;
  public filter$: BehaviorSubject<ThesaurusFilter>;
  public pageSize: FormControl;
  public user: User;
  public userLevel: number;

  constructor(
    @Inject(THESAURI_PAGINATOR)
    public paginator: PaginatorPlugin<ThesauriState>,
    private _thesaurusService: ThesaurusService,
    private _listService: ThesauriListService,
    private _dialogService: DialogService,
    private _router: Router,
    private _authService: AuthService,
    formBuilder: FormBuilder
  ) {
    this.pageSize = formBuilder.control(20);
  }

  private getRequest(
    filter: ThesaurusFilter
  ): () => Observable<PaginationResponse<Thesaurus>> {
    return () =>
      this._thesaurusService.getThesauri(filter).pipe(
        // adapt server results to the paginator plugin
        map((p: DataPage<Thesaurus>) => {
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

    // filter
    const initialPageSize = 20;
    this.filter$ = new BehaviorSubject<ItemFilter>(
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

  public pageChanged(event: PageEvent) {
    // https://material.angular.io/components/paginator/api
    this.paginator.setPage(event.pageIndex + 1);
    if (event.pageSize !== this.pageSize.value) {
      this.pageSize.setValue(event.pageSize);
    }
  }

  public addThesaurus() {
    this._router.navigate(['/thesauri', 'new']);
  }

  public editThesaurus(thesaurus: Thesaurus) {
    this._router.navigate(['/thesauri', thesaurus.id]);
  }

  public deleteThesaurus(thesaurus: Thesaurus) {
    if (this.user.roles.every(r => r !== 'admin' && r !== 'editor')) {
      return;
    }

    this._dialogService
      .confirm('Confirm Deletion', `Delete thesaurus "${thesaurus.id}"?`)
      .subscribe((ok: boolean) => {
        if (!ok) {
          return;
        }
        this._listService.delete(thesaurus.id);
      });
  }
}
