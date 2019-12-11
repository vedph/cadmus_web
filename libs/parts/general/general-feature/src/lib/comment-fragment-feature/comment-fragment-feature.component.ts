import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThesauriSet } from '@cadmus/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditCommentFragmentQuery } from './edit-comment-fragment.query';
import { EditCommentFragmentService } from './edit-comment-fragment.service';
import { EditItemQuery, EditItemService, EditTokenLayerPartQuery, EditTokenLayerPartService } from '@cadmus/features/edit-state';

@Component({
  selector: 'cadmus-comment-fragment-feature',
  templateUrl: './comment-fragment-feature.component.html',
  styleUrls: ['./comment-fragment-feature.component.css']
})
export class CommentFragmentFeatureComponent implements OnInit {
  public json$: Observable<string>;
  public thesauri$: Observable<ThesauriSet>;

  public itemId: string;
  public partId: string;
  public frTypeId: string;
  public loc: string;
  public frRoleId: string;

  constructor(
    private _router: Router,
    route: ActivatedRoute,
    private _editFrQuery: EditCommentFragmentQuery,
    private _editFrService: EditCommentFragmentService,
    private _editItemQuery: EditItemQuery,
    private _editItemService: EditItemService,
    private _editLayersQuery: EditTokenLayerPartQuery,
    private _editLayersService: EditTokenLayerPartService
  ) {
    this.itemId = route.snapshot.params['iid'];
    this.partId = route.snapshot.params['pid'];
    this.frTypeId = route.snapshot.params['frtid'];
    this.loc = route.snapshot.params['loc'];
    this.frRoleId = route.snapshot.queryParams['frrid'];
  }

  private ensureItemLoaded(id: string) {
    if (!this._editItemQuery.hasItem(id)) {
      this._editItemService.load(id);
    }
  }

  private ensureLayersLoaded() {
    if (!this._editLayersQuery.getValue().part) {
      this._editLayersService.load(this.itemId, this.partId,
        `${this.frTypeId}:${this.frRoleId}`);
    }
  }

  ngOnInit() {
    this.json$ = this._editFrQuery.selectJson();
    this.thesauri$ = this._editFrQuery.selectThesauri();
    // load item if required
    this.ensureItemLoaded(this.itemId);
    // load layers if required
    this.ensureLayersLoaded();
    // load fragment
    this._editFrService.load(this.partId, this.loc, ['comment-tags']);
  }

  public save(json: string) {
    this._editFrService.save(json);
  }

  public close() {
    this._router.navigate(['items', this.itemId]);
  }
}
