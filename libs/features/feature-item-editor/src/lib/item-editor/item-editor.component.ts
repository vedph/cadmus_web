import { Component, OnInit } from '@angular/core';
import { ItemEditorService } from '../services/item-editor.service';
import { ItemQuery } from '../state/item.query';
import { Observable } from 'rxjs';
import { Item, PartGroup, PartDefinition, FacetDefinition, FlagDefinition } from '@cadmus/core';

@Component({
  selector: 'cadmus-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {
  public item$: Observable<Item>;
  public partGroups$: Observable<PartGroup[]>;
  // lookup data
  public facetParts$: Observable<PartDefinition[]>;
  public facets$: Observable<FacetDefinition[]>;
  public flags$: Observable<FlagDefinition[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<string>;

  constructor(
    private _query: ItemQuery,
    private _itemEditorService: ItemEditorService) { }

  ngOnInit() {
    this.item$ = this._query.select(state => state.item);
    this.partGroups$ = this._query.select(state => state.partGroups);
    this.facetParts$ = this._query.select(state => state.facetParts);
    this.facets$ = this._query.select(state => state.facets);
    this.flags$ = this._query.select(state => state.flags);
    this.loading$ = this._query.selectLoading();
    this.error$ = this._query.selectError();
  }

}
