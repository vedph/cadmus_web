import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThesauriSet } from '@cadmus/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditItemQuery, EditItemService } from '@cadmus/features/edit-state';
import { EditTokenTextPartQuery } from './edit-token-text-part.query';
import { EditTokenTextPartService } from './edit-token-text-part.service';

@Component({
  selector: 'cadmus-token-text-part-feature',
  templateUrl: './token-text-part-feature.component.html',
  styleUrls: ['./token-text-part-feature.component.css']
})
export class TokenTextPartFeatureComponent implements OnInit {
  public json$: Observable<string>;
  public thesauri$: Observable<ThesauriSet>;

  public itemId: string;
  public partId: string;
  public roleId: string;

  constructor(
    private _router: Router,
    route: ActivatedRoute,
    private _editPartQuery: EditTokenTextPartQuery,
    private _editPartService: EditTokenTextPartService,
    private _editItemQuery: EditItemQuery,
    private _editItemService: EditItemService
  ) {
    this.itemId = route.snapshot.params['iid'];
    this.partId = route.snapshot.params['pid'];
    if (this.partId === 'new') {
      this.partId = null;
    }
    this.roleId = route.snapshot.queryParams['rid'];
  }

  private ensureItemLoaded(id: string) {
    if (!this._editItemQuery.hasItem(id)) {
      this._editItemService.load(id);
    }
  }

  ngOnInit() {
    this.json$ = this._editPartQuery.selectJson(
      this.itemId,
      this.partId,
      this.roleId
    );
    this.thesauri$ = this._editPartQuery.selectThesauri();
    // load item if required
    this.ensureItemLoaded(this.itemId);
    // load part
    if (this.partId) {
      this._editPartService.load(this.partId);
    }
  }

  public save(json: string) {
    this._editPartService.save(json);
  }

  public close() {
    this._router.navigate(['items', this.itemId]);
  }
}
