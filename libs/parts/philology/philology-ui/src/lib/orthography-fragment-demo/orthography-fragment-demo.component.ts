import { Component, OnInit, Input } from '@angular/core';
import { Thesaurus, JsonSchemaService } from '@cadmus/core';
import { ORTHOGRAPHY_FRAGMENT_TYPEID, ORTHOGRAPHY_FRAGMENT_SCHEMA } from '../..';

@Component({
  selector: 'cadmus-orthography-fragment-demo',
  templateUrl: './orthography-fragment-demo.component.html',
  styleUrls: ['./orthography-fragment-demo.component.css']
})
export class OrthographyFragmentDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = ORTHOGRAPHY_FRAGMENT_TYPEID;
  public partJson: string;
  public thesauri: { [key: string]: Thesaurus } | null;

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
