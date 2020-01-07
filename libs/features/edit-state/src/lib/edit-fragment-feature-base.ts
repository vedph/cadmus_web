import { Observable } from 'rxjs';
import {
  ThesauriSet,
  TokenLocation,
  ComponentCanDeactivate
} from '@cadmus/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditTokenLayerPartQuery,
  EditTokenLayerPartService,
  EditFragmentServiceBase,
  EditFragmentQueryBase
} from '@cadmus/features/edit-state';

export abstract class EditFragmentFeatureBase
  implements ComponentCanDeactivate {
  private _formDirty: boolean;
  private _stateDirty: boolean;

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

    // connect _stateDirty to the value of the edit state
    this._editFrQuery.selectDirty().subscribe(d => {
      this._stateDirty = d;
    });
  }

  /**
   * Implementation of ComponentCanDeactivate. The editor can deactivate
   * when both its "root" form in the wrapped UI editor and the edit state
   * are not dirty. The form gets dirty when edited by the user; the edit
   * state gets dirty after a failed save attempt.
   */
  public canDeactivate(): boolean {
    // can-deactivate from dirty
    return !this._formDirty && !this._stateDirty;
  }

  private ensureItemLoaded(id: string) {
    if (!this._editItemQuery.hasItem(id)) {
      this._editItemService.load(id);
    }
  }

  private ensureLayersLoaded() {
    if (!this._editLayersQuery.getValue().part) {
      this._editLayersService.load(
        this.itemId,
        this.partId,
        `${this.frTypeId}:${this.frRoleId}`
      );
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

  /**
   * Called when the wrapped editor dirty state changes.
   * In the HTML template, you MUST bind this handler to the dirtyChange event
   * emitted by your wrapped editor (i.e. (dirtyChange)="onDirtyChange($event)").
   * @param value The value of the dirty state.
   */
  public onDirtyChange(value: boolean) {
    this._formDirty = value;
  }

  public save(json: string) {
    this._editFrService.save(json);
  }

  public close() {
    this._router.navigate(['items', this.itemId]);
  }
}
