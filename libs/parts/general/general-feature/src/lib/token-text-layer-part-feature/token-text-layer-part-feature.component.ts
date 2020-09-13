import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TokenLocation,
  LibraryRouteService,
  TextLayerService,
  ComponentCanDeactivate,
  LayerHint
} from '@cadmus/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@cadmus/ui';
import {
  EditLayerPartQuery,
  EditLayerPartService,
  EditItemQuery,
  EditItemService
} from '@cadmus/features/edit-state';
import { AuthService } from '@cadmus/api';

/**
 * Token-based text layer part feature editor. This is a special type of editor,
 * rather than being a simple wrapper like the others; it is used for editing
 * any text layer (using token-based coordinates), whatever the type of its
 * fragments. Being a sort of portal for accessing a fragments editor, it has
 * no save capability: the single fragments are edited and saved as needed.
 */
@Component({
  selector: 'cadmus-token-text-layer-part-feature',
  templateUrl: './token-text-layer-part-feature.component.html',
  styleUrls: ['./token-text-layer-part-feature.component.css']
})
export class TokenTextLayerPartFeatureComponent
  implements OnInit, ComponentCanDeactivate {
  public itemId: string;
  public partId: string;
  public roleId: string;

  public loading$: Observable<boolean>;
  public error$: Observable<string>;
  public baseText$: Observable<string>;
  public locations$: Observable<TokenLocation[]>;
  public refreshingBreakChance$: Observable<boolean>;
  public breakChance$: Observable<number>;
  public layerHints$: Observable<LayerHint[]>;
  public patchingLayer$: Observable<boolean>;
  public deletingFragment$: Observable<boolean>;

  public pickedLocation: string;
  public userLevel: number;

  constructor(
    route: ActivatedRoute,
    private _router: Router,
    private _editQuery: EditLayerPartQuery,
    private _editService: EditLayerPartService,
    private _textLayerService: TextLayerService,
    private _editItemQuery: EditItemQuery,
    private _editItemService: EditItemService,
    private _libraryRouteService: LibraryRouteService,
    private _dialogService: DialogService,
    authService: AuthService
  ) {
    this.itemId = route.snapshot.params['iid'];
    this.partId = route.snapshot.params['pid'];
    if (this.partId === 'new') {
      this.partId = null;
    }
    this.roleId = route.snapshot.queryParams['rid'];
    if (this.roleId === 'default') {
      this.roleId = null;
    }
    this.userLevel = authService.getCurrentUserLevel();
  }

  public canDeactivate(): boolean {
    return true;
  }

  private ensureItemLoaded(id: string) {
    if (!this._editItemQuery.hasItem(id)) {
      this._editItemService.load(id);
    }
  }

  ngOnInit() {
    this.loading$ = this._editQuery.selectLoading();
    this.error$ = this._editQuery.selectError();
    this.baseText$ = this._editQuery.select(state => state.baseText);
    this.locations$ = this._editQuery.select(state => state.locations);
    this.refreshingBreakChance$ = this._editQuery.selectRefreshingBreakChance();
    this.breakChance$ = this._editQuery.selectBreakChance();
    this.layerHints$ = this._editQuery.selectLayerHints();
    this.patchingLayer$ = this._editQuery.selectPatchingLayers();
    this.deletingFragment$ = this._editQuery.selectDeletingFragment();

    // when the base text changes, load all the fragments locations
    // this.baseText$.subscribe(_ => {
    //   this.loadAllFragmentLocations();
    // });

    // ensure the container item is loaded
    this.ensureItemLoaded(this.itemId);

    // load the layer part data
    this._editService.load(this.itemId, this.partId);
  }

  public deleteFragment() {
    const loc = this._textLayerService.getSelectedLocationForEdit(
      this._textLayerService.getSelectedRange()
    );
    if (!loc) {
      return;
    }

    this._dialogService
      .confirm('Delete Fragment', `Delete the fragment at ${loc}?`)
      .subscribe((ok: boolean) => {
        if (ok) {
          // find the fragment and remove it from the part
          const i = this._editQuery.getValue().part.fragments.findIndex(p => {
            return TokenLocation.parse(p.location).overlaps(loc);
          });
          if (i === -1) {
            return;
          }
          this._editService.deleteFragment(loc);
        }
      });
  }

  public deleteFragmentFromHint(hint: LayerHint) {
    const loc = TokenLocation.parse(hint.location);
    this._editService.deleteFragment(loc);
  }

  public refreshBreakChance() {
    this._editService.refreshBreakChance();
  }

  private navigateToFragmentEditor(loc: string) {
    const part = this._editQuery.getValue().part;

    const { route, rid } = this._libraryRouteService.buildFragmentEditorRoute(
      this._editItemQuery.getValue().facet.partDefinitions,
      part.itemId,
      part.id,
      part.typeId,
      part.roleId,
      loc
    );

    // navigate to the editor
    this._router.navigate(
      [route],
      rid
        ? {
            queryParams: {
              rid: part.roleId
            }
          }
        : {}
    );
  }

  public editFragment() {
    const loc = this._textLayerService.getSelectedLocationForEdit(
      this._textLayerService.getSelectedRange()
    );
    this.navigateToFragmentEditor(loc.toString());
  }

  public editFragmentFromHint(hint: LayerHint) {
    this.navigateToFragmentEditor(hint.location);
  }

  public addFragment() {
    const loc = this._textLayerService.getSelectedLocationForNew(
      this._textLayerService.getSelectedRange(),
      this._editQuery.getValue().baseText
    );
    this.navigateToFragmentEditor(loc.toString());
  }

  public moveFragmentFromHint(hint: LayerHint) {
    if (!this.pickedLocation || this.pickedLocation === hint.location) {
      return;
    }
    this._editService.applyLayerPatches(this.partId, [
      `mov ${hint.location} ${this.pickedLocation}`
    ]);
  }

  public applyLayerPatches(patches: string[]) {
    this._editService.applyLayerPatches(this.partId, patches);
  }

  public pickLocation() {
    const location = this._textLayerService.getSelectedLocationForNew(
      this._textLayerService.getSelectedRange(),
      this._editQuery.getValue().baseText
    );
    if (location) {
      this.pickedLocation = location.toString();
    }
  }

  public close() {
    this._router.navigate(['/items', this.itemId]);
  }
}
