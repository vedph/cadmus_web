import { Component, OnInit, Input } from '@angular/core';
import { JsonSchemaService, ThesauriSet } from '@cadmus/core';
import { ORTHOGRAPHY_FRAGMENT_TYPEID, ORTHOGRAPHY_FRAGMENT_SCHEMA } from '../orthography-fragment';

@Component({
  selector: 'cadmus-orthography-fragment-demo',
  templateUrl: './orthography-fragment-demo.component.html',
  styleUrls: ['./orthography-fragment-demo.component.css']
})
export class OrthographyFragmentDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = ORTHOGRAPHY_FRAGMENT_TYPEID;
  public modelJson: string;
  public thesauri: ThesauriSet | null;

  @Input()
  public get thesauriJson(): string {
    return this._thesauriJson;
  }
  public set thesauriJson(value: string) {
    if (this._thesauriJson === value) {
      return;
    }
    this._thesauriJson = value;
    if (value) {
      this.thesauri = JSON.parse(value);
    } else {
      this.thesauri = null;
    }
  }

  constructor(schemaService: JsonSchemaService) {
    this.currentTabIndex = 0;
    schemaService.addSchema(ORTHOGRAPHY_FRAGMENT_TYPEID, ORTHOGRAPHY_FRAGMENT_SCHEMA);
  }

  ngOnInit() {
  }

  public onCodeSaved() {
    this.currentTabIndex = 1;
  }

  public onEditorSaved() {
    this.currentTabIndex = 0;
  }
}
