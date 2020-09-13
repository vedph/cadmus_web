import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TokenLocation,
  LibraryRouteService,
  ComponentCanDeactivate,
  LayerHint,
} from '@cadmus/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EditLayerPartQuery,
  EditLayerPartService,
  EditItemQuery,
  EditItemService,
} from '@cadmus/features/edit-state';
import { DialogService } from '@cadmus/ui';
import { TextTileRow, TiledTextPart } from '@cadmus/parts/general/general-ui';
import { TiledTextLayerView, TextTileLayerView } from './tiled-text-layer-view';
import { AuthService } from '@cadmus/api';

/**
 * Tiled text layer part editor.
 * This editor allows picking any layer and see all the text tiles included
 * in a fragment with a color highlight. Users can check any number of tiles
 * not belonging to any fragment in the selected layer, and add a new fragment
 * in the selected layer; or check any number of tiles belonging to a fragment
 * of the selected layer, and edit or delete it.
 * Tiles are thus colorized by the UI to render the fragments extent; and freely
 * checked by users to select the fragments to operate with.
 * All the checked tiles must follow each other, in one or more rows. Users can
 * just check the first and the last of a sequence to get the whole sequence
 * checked.
 */
@Component({
  selector: 'cadmus-tiled-text-layer-part-feature',
  templateUrl: './tiled-text-layer-part-feature.component.html',
  styleUrls: ['./tiled-text-layer-part-feature.component.css'],
})
export class TiledTextLayerPartFeatureComponent
  implements OnInit, ComponentCanDeactivate {
  public view: TiledTextLayerView;
  public selectedTile: TextTileLayerView;

  public itemId: string;
  public partId: string;
  public roleId: string;

  public loading$: Observable<boolean>;
  public error$: Observable<string>;
  public baseText$: Observable<string>;
  public locations$: Observable<TokenLocation[]>;
  public rows$: Observable<TextTileRow[]>;
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
    // base text: connect rows to the base text part
    this.rows$ = this._editQuery.select(
      (state) => (state.baseTextPart as TiledTextPart)?.rows
    );

    // layers part
    this.loading$ = this._editQuery.selectLoading();
    this.error$ = this._editQuery.selectError();
    this.baseText$ = this._editQuery.select((state) => state.baseText);
    this.locations$ = this._editQuery.select((state) => state.locations);
    this.refreshingBreakChance$ = this._editQuery.selectRefreshingBreakChance();
    this.breakChance$ = this._editQuery.selectBreakChance();
    this.layerHints$ = this._editQuery.selectLayerHints();
    this.patchingLayer$ = this._editQuery.selectPatchingLayers();
    this.deletingFragment$ = this._editQuery.selectDeletingFragment();

    // when the base text changes, load all the fragments locations
    // and setup their UI state
    this.rows$.subscribe((rows) => {
      this.view = rows ? new TiledTextLayerView(rows) : null;
      this.view?.setFragmentLocations(this._editQuery.getValue().locations);
    });

    // ensure that the container item is loaded
    this.ensureItemLoaded(this.itemId);

    // load the layer part
    this._editService.load(this.itemId, this.partId);
  }

  public refreshBreakChance() {
    this._editService.refreshBreakChance();
  }

  public onTileChecked(y: number, x: number, checked: boolean) {
    this.view.toggleLinearTileCheck(y, x, checked);
  }

  private getSelectedTileCoords(): { y: number; x: number } | null {
    if (!this.selectedTile || !this.view) {
      return null;
    }
    for (let i = 0; i < this.view.rows.length; i++) {
      const j = this.view.rows[i].tiles.indexOf(this.selectedTile);
      if (j > -1) {
        return { y: i + 1, x: j + 1 };
      }
    }
    return null;
  }

  public selectPrevTile() {
    let yx = this.getSelectedTileCoords();
    if (yx) {
      yx = this.view.getPrevTileCoords(yx.y, yx.x);
      if (yx) {
        this.selectedTile = this.view.rows[yx.y - 1].tiles[yx.x - 1];
      }
    }
  }

  public selectNextTile() {
    let yx = this.getSelectedTileCoords();
    if (yx) {
      yx = this.view.getNextTileCoords(yx.y, yx.x);
      if (yx) {
        this.selectedTile = this.view.rows[yx.y - 1].tiles[yx.x - 1];
      }
    }
  }

  public deleteFragment() {
    const lf = this.view.getCheckedLocationAndFragment();
    if (!lf || lf.fragment === -1) {
      return;
    }

    const locations = this._editQuery.getValue().locations;
    const loc = locations[lf.fragment];
    this._dialogService
      .confirm('Delete Fragment', `Delete the fragment at ${loc}?`)
      .subscribe((ok: boolean) => {
        if (ok) {
          // find the fragment and remove it from the part
          const i = this._editQuery.getValue().part.fragments.findIndex((p) => {
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
              rid: part.roleId,
            },
          }
        : {}
    );
  }

  public editFragment() {
    const lf = this.view.getCheckedLocationAndFragment();
    if (!lf || lf.fragment === -1) {
      return;
    }
    const locations = this._editQuery.getValue().locations;
    this.navigateToFragmentEditor(locations[lf.fragment].toString());
  }

  public editFragmentFromHint(hint: LayerHint) {
    this.navigateToFragmentEditor(hint.location);
  }

  public moveFragmentFromHint(hint: LayerHint) {
    if (!this.pickedLocation || this.pickedLocation === hint.location) {
      return;
    }
    this._editService.applyLayerPatches(this.partId, [
      `mov ${hint.location} ${this.pickedLocation}`,
    ]);
  }

  public addFragment() {
    const lf = this.view.getCheckedLocationAndFragment();
    if (!lf || lf.fragment > -1) {
      return;
    }
    this.navigateToFragmentEditor(lf.location.toString());
  }

  public pickLocation() {
    const lf = this.view.getCheckedLocationAndFragment();
    if (!lf) {
      return;
    }
    const locations = this._editQuery.getValue().locations;
    this.pickedLocation = (lf.fragment === -1
      ? lf.location
      : locations[lf.fragment]
    ).toString();
  }

  public clearTileChecks() {
    this.view.setAllTilesViewState({ checked: false });
    this.pickedLocation = null;
  }

  public applyLayerPatches(patches: string[]) {
    this._editService.applyLayerPatches(this.partId, patches);
  }

  public close() {
    this._router.navigate(['/items', this.itemId]);
  }
}
