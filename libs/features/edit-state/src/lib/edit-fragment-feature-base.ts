import { Observable } from 'rxjs';
import {
  ThesauriSet,
  TokenLocation,
  ComponentCanDeactivate,
  LibraryRouteService,
  FacetDefinition
} from '@cadmus/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EditItemQuery,
  EditItemService,
  EditLayerPartQuery,
  EditLayerPartService,
  EditFragmentServiceBase,
  EditFragmentQueryBase
} from '@cadmus/features/edit-state';
import { AppQuery } from './app.query';

export abstract class EditFragmentFeatureBase
  implements ComponentCanDeactivate {
  private _formDirty: boolean;
  private _stateDirty: boolean;

  public json$: Observable<string>;
  public thesauri$: Observable<ThesauriSet>;

  public baseText$: Observable<string>;
  public frLoc: TokenLocation;

  public readonly itemId: string;
  public readonly partId: string;
  public readonly frTypeId: string;
  public readonly loc: string;
  public readonly frRoleId: string;

  constructor(
    private _router: Router,
    route: ActivatedRoute,
    private _appQuery: AppQuery,
    private _editFrQuery: EditFragmentQueryBase,
    private _editFrService: EditFragmentServiceBase,
    private _editItemQuery: EditItemQuery,
    private _editItemService: EditItemService,
    private _editLayersQuery: EditLayerPartQuery,
    private _editLayersService: EditLayerPartService,
    private _libraryRouteService: LibraryRouteService
  ) {
    this.itemId = route.snapshot.params['iid'];
    this.partId = route.snapshot.params['pid'];
    this.frTypeId = route.snapshot.url[2]?.path;
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

  private ensureLayersLoaded(thesauriIds: string[]) {
    if (!this._editLayersQuery.getValue().part) {
      this._editLayersService.load(this.itemId, this.partId, thesauriIds);
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
    this.ensureLayersLoaded(thesauriIds);
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
    // /items/<id>/<part-group>/<part-typeid>/<part-id>?rid=<role-id>
    const part = this._editLayersQuery.getValue().part;
    const item = this._editItemQuery.getValue().item;
    const facet: FacetDefinition = this._appQuery.getValue().facets.find(f => {
      return f.id === item.facetId;
    });
    const partDef = facet.partDefinitions.find(d => {
      return d.typeId === part.typeId && d.roleId === d.roleId;
    });

    const editorKey = this._libraryRouteService.getEditorKeyFromPartType(
      part.typeId,
      part.roleId
    );

    const url = `/items/${this.itemId}/${editorKey.partKey}/${part.typeId}/${this.partId}`;
    this._router.navigate([url], {
      queryParams: {
        rid: this.frTypeId
      }
    });
  }
}
