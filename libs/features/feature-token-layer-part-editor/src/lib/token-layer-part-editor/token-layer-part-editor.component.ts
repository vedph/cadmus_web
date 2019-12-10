import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  EditTokenLayerPartQuery,
  EditTokenLayerPartService,
  EditItemQuery,
  EditItemService
} from '@cadmus/features/edit-state';
import { Observable } from 'rxjs';
import {
  PartDefinition,
  TokenLocation,
  TextLayerService,
  LibraryRouteService
} from '@cadmus/core';
import { RolePartId } from '@cadmus/api';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DialogService } from '@cadmus/ui';

@Component({
  selector: 'cadmus-token-layer-part-editor',
  templateUrl: './token-layer-part-editor.component.html',
  styleUrls: ['./token-layer-part-editor.component.css']
})
export class TokenLayerPartEditorComponent implements OnInit {
  public itemId: string;
  public partId: string;
  public roleId: string;

  public loading$: Observable<boolean>;
  public error$: Observable<string>;
  public baseText$: Observable<string>;
  public layers$: Observable<PartDefinition[]>;
  public selectedLayer$: Observable<PartDefinition>;
  public rolePartIds$: Observable<RolePartId[]>;

  public selectedLayer: FormControl;
  public coordsInfo: string;
  public locations: TokenLocation[];

  constructor(
    formBuilder: FormBuilder,
    route: ActivatedRoute,
    private _router: Router,
    private _editQuery: EditTokenLayerPartQuery,
    private _editService: EditTokenLayerPartService,
    private _textLayerService: TextLayerService,
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

  private ensureItemLoaded(id: string) {
    if (!this._editItemQuery.hasItem(id)) {
      this._editItemService.load(id);
    }
  }

  ngOnInit() {
    this.loading$ = this._editQuery.selectLoading();
    this.error$ = this._editQuery.selectError();
    this.baseText$ = this._editQuery.select(state => state.baseText);
    this.layers$ = this._editQuery.select(state => state.layers);
    this.selectedLayer$ = this._editQuery.select(state => state.selectedLayer);
    this.rolePartIds$ = this._editQuery.select(state => state.rolePartIds);

    // load all the fragments locations when the base text changes,
    // so that it can be decorated
    this.baseText$.subscribe(_ => {
      this.loadAllFragmentLocations();
    });

    // when the layers are loaded, set the initial layer selection if any
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
    const loc = this._textLayerService.getSelectedLocationForEdit(
      this._textLayerService.getSelectedRange()
    );
    if (this.selectedLayer.invalid || !loc) {
      return;
    }
    this.navigateToFragmentEditor(loc.toString());
  }

  public addFragment() {
    const loc = this._textLayerService.getSelectedLocationForNew(
      this._textLayerService.getSelectedRange(),
      this._editQuery.getValue().baseText
    );
    if (this.selectedLayer.invalid || !loc) {
      return;
    }
    this.navigateToFragmentEditor(loc.toString());
  }

  public getCoordsInfo() {
    this.coordsInfo = this._textLayerService
      .getSelectedLocationForNew(
        this._textLayerService.getSelectedRange(),
        this._editQuery.getValue().baseText
      )
      .toString();
  }
}
