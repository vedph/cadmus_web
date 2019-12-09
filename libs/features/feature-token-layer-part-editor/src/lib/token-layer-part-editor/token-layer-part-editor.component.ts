import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EditTokenLayerPartQuery,
  EditTokenLayerPartService
} from '@cadmus/features/edit-state';
import { Observable } from 'rxjs';
import { PartDefinition, TokenLocation, TextLayerService } from '@cadmus/core';
import { RolePartId } from '@cadmus/api';
import { FormControl, FormBuilder } from '@angular/forms';

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
    route: ActivatedRoute,
    formBuilder: FormBuilder,
    private _query: EditTokenLayerPartQuery,
    private _editService: EditTokenLayerPartService,
    private _textLayerService: TextLayerService
  ) {
    this.itemId = route.snapshot.params['iid'];
    this.partId = route.snapshot.params['pid'];
    this.roleId = route.snapshot.queryParams['rid'];

    // form
    this.selectedLayer = formBuilder.control(null);
  }

  ngOnInit() {
    this.loading$ = this._query.selectLoading();
    this.error$ = this._query.selectError();
    this.baseText$ = this._query.select(state => state.baseText);
    this.layers$ = this._query.select(state => state.layers);
    this.selectedLayer$ = this._query.select(state => state.selectedLayer);
    this.rolePartIds$ = this._query.select(state => state.rolePartIds);

    this.baseText$.subscribe(_ => {
      this.decorateBaseText();
    });

    this._editService.load(this.itemId, this.partId);
  }

  private decorateBaseText() {
    const locations: TokenLocation[] = [];
    const part = this._query.getValue().part;

    if (part && part.fragments) {
      part.fragments.forEach(p => {
        locations.push(TokenLocation.parse(p.location));
      });
    }
    this.locations = locations;
  }

  public editFragment() {
    // TODO:
  }

  public deleteFragment() {
    // TODO:
  }

  public addFragment() {
    // TODO:
  }

  public getCoordsInfo() {
    this.coordsInfo = this._textLayerService
      .getSelectedLocationForNew(
        this._textLayerService.getSelectedRange(),
        this._query.getValue().baseText
      )
      .toString();
  }
}
