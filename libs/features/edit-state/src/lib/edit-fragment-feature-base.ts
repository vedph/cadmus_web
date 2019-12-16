import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThesauriSet, TokenLocation } from '@cadmus/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditItemQuery, EditItemService, EditTokenLayerPartQuery, EditTokenLayerPartService, EditFragmentServiceBase, EditFragmentQueryBase } from '@cadmus/features/edit-state';

export abstract class EditFragmentFeatureBase {
  public json$: Observable<string>;
  public thesauri$: Observable<ThesauriSet>;

  public baseText$: Observable<string>;
  public frLoc: TokenLocation;

  public itemId: string;
  public partId: string;
  public frTypeId: string;
  public loc: string;
  public frRoleId: string;

  constructor(
    private _router: Router,
    route: ActivatedRoute,
    private _editFrQuery: EditFragmentQueryBase,
    private _editFrService: EditFragmentServiceBase,
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

  protected initEditor(thesauriIds: string[]) {
    this.json$ = this._editFrQuery.selectJson();
    this.thesauri$ = this._editFrQuery.selectThesauri();
    this.baseText$ = this._editLayersQuery.select(state => state.baseText);
    this.frLoc = TokenLocation.parse(this.loc);

    // load item if required
    this.ensureItemLoaded(this.itemId);
    // load layers if required
    this.ensureLayersLoaded();
    // load fragment
    this._editFrService.load(this.partId, this.loc, thesauriIds);
  }

  public save(json: string) {
    this._editFrService.save(json);
  }

  public close() {
    this._router.navigate(['items', this.itemId]);
  }
}
