import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PartDefinition,
  TokenLocation,
  LibraryRouteService,
  ComponentCanDeactivate
} from '@cadmus/core';
import { RolePartId } from '@cadmus/api';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EditLayerPartQuery,
  EditLayerPartService,
  EditItemQuery,
  EditItemService
} from '@cadmus/features/edit-state';
import { DialogService } from '@cadmus/ui';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  TextTileRow,
  TiledTextPart,
  TextTile
} from '@cadmus/parts/general/general-ui';
import { EditTiledTextPartQuery } from '../tiled-text-part-feature/edit-tiled-text-part.query';
import { EditTiledTextPartService } from '../tiled-text-part-feature/edit-tiled-text-part.service';
import { TiledTextUIState } from './tiled-text-ui-state';

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
  styleUrls: ['./tiled-text-layer-part-feature.component.css']
})
export class TiledTextLayerPartFeatureComponent
  implements OnInit, ComponentCanDeactivate {
  // this handles the UI state of all the text tiles, i.e. their checked state,
  // and their link to any of the fragments. Fragments links are expressed
  // via indexes, which refer to the locations array. This is filled with the
  // locations of all the fragments in the selected layer.
  private _textRows: TextTileRow[];
  private _tiledTextUIState: TiledTextUIState;

  public itemId: string;
  public partId: string;
  public roleId: string;

  public loading$: Observable<boolean>;
  public error$: Observable<string>;
  public baseText$: Observable<string>;
  public layers$: Observable<PartDefinition[]>;
  public selectedLayer$: Observable<PartDefinition>;
  public rolePartIds$: Observable<RolePartId[]>;

  public rows$: Observable<TextTileRow[]>;
  public selectedTile: TextTile;

  public selectedLayer: FormControl;
  public coordsInfo: string;
  public locations: TokenLocation[];

  constructor(
    formBuilder: FormBuilder,
    route: ActivatedRoute,
    private _router: Router,
    private _editQuery: EditLayerPartQuery,
    private _editService: EditLayerPartService,
    private _editBaseTextQuery: EditTiledTextPartQuery,
    private _editBaseTextService: EditTiledTextPartService,
    private _editItemQuery: EditItemQuery,
    private _editItemService: EditItemService,
    private _libraryRouteService: LibraryRouteService,
    private _dialogService: DialogService
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

    // form
    this.selectedLayer = formBuilder.control(null, Validators.required);
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
    // base text
    this.rows$ = this._editBaseTextQuery.select(
      state => (state.part as TiledTextPart)?.rows
    );
    if (this.partId) {
      this._editBaseTextService.load(this.partId, null);
    }

    // layers part
    this.loading$ = this._editQuery.selectLoading();
    this.error$ = this._editQuery.selectError();
    this.baseText$ = this._editQuery.select(state => state.baseText);
    this.layers$ = this._editQuery.select(state => state.layers);
    this.selectedLayer$ = this._editQuery.select(state => state.selectedLayer);
    this.rolePartIds$ = this._editQuery.select(state => state.rolePartIds);

    // when the base text changes, load all the fragments locations
    // and setup their UI state
    this.rows$.subscribe(rows => {
      this._textRows = rows;
      this.loadAllFragmentLocations();
      this._tiledTextUIState = rows? new TiledTextUIState(rows) : null;
      this._tiledTextUIState?.setFragmentLocations(this.locations);
    });

    // when the selected layer changes, re-set all the fragment locations
    this.selectedLayer$.subscribe(_ => {
      this.loadAllFragmentLocations();
      if (this._textRows) {
        this._tiledTextUIState = new TiledTextUIState(this._textRows);
        this._tiledTextUIState.setFragmentLocations(this.locations);
      }
    });

    // when the available layers are loaded, set the initial layer selection if any
    this.layers$.subscribe(l => {
      if (this.roleId) {
        const layers = this._editQuery.getValue().layers;
        if (layers) {
          this.selectedLayer.setValue(
            layers.find(d => d.roleId === this.roleId)
          );
        }
      }
    });

    // when the selected layer changes, update the store
    this.selectedLayer.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(layer => {
        this._editService.selectLayer(layer);
      });

    this.ensureItemLoaded(this.itemId);

    // load the store for the requested item's part,
    // or create a new part and load it if adding a new one.
    // Eager creation here is a requirement, because we are
    // providing a fragments editor, which requires their container part.
    if (this.partId) {
      this._editService.load(this.itemId, this.partId);
    } else {
      this._editService.addAndLoad(this.itemId);
    }
  }

  private loadAllFragmentLocations() {
    const locations: TokenLocation[] = [];
    const part = this._editQuery.getValue().part;

    if (part && part.fragments) {
      part.fragments.forEach(p => {
        locations.push(TokenLocation.parse(p.location));
      });
    }
    this.locations = locations;
  }

  public isTileInFragment(y: number, x: number): boolean {
    return (
      this._tiledTextUIState &&
      this._tiledTextUIState.getFragmentIndex(y, x) > -1
    );
  }

  public onTileChecked(y: number, x: number, checked: boolean) {
    // reflect user check in the UI state
    this._tiledTextUIState.toggleLinearTileCheck(y, x, checked);
  }

  public isTileChecked(y: number, x: number): boolean {
    // reflect the UI state in the view
    return this._tiledTextUIState.isChecked(y, x);
  }

  public deleteFragment() {
    const lf = this._tiledTextUIState.getCheckedLocationAndFragment();
    if (!lf || lf.fragment === -1) {
      return;
    }

    const loc = this.locations[lf.fragment];
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

  private navigateToFragmentEditor(loc: string) {
    const part = this._editQuery.getValue().part;

    const { route, rid } = this._libraryRouteService.buildFragmentEditorRoute(
      this._editItemQuery.getValue().facetParts,
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
    if (this.selectedLayer.invalid) {
      return;
    }
    const lf = this._tiledTextUIState.getCheckedLocationAndFragment();
    if (!lf || lf.fragment === -1) {
      return;
    }
    this.navigateToFragmentEditor(this.locations[lf.fragment].toString());
  }

  public addFragment() {
    if (this.selectedLayer.invalid) {
      return;
    }
    const lf = this._tiledTextUIState.getCheckedLocationAndFragment();
    if (!lf || lf.fragment > -1) {
      return;
    }
    this.navigateToFragmentEditor(lf.location.toString());
  }

  public getCoordsInfo() {
    const lf = this._tiledTextUIState.getCheckedLocationAndFragment();
    if (!lf) {
      return;
    }
    this.coordsInfo = (lf.fragment === -1
      ? lf.location
      : this.locations[lf.fragment]
    ).toString();
  }

  public close() {
    this._router.navigate(['/items', this.itemId]);
  }
}
