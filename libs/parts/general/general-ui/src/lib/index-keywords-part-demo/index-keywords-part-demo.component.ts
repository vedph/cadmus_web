import { Component, OnInit, Input } from '@angular/core';
import {
  INDEX_KEYWORDS_PART_TYPEID,
  INDEX_KEYWORDS_PART_SCHEMA
} from '../index-keywords-part';
import { ThesauriSet, JsonSchemaService } from '@cadmus/core';

@Component({
  selector: 'cadmus-index-keywords-part-demo',
  templateUrl: './index-keywords-part-demo.component.html',
  styleUrls: ['./index-keywords-part-demo.component.css']
})
export class IndexKeywordsPartDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = INDEX_KEYWORDS_PART_TYPEID;
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
    schemaService.addSchema(
      INDEX_KEYWORDS_PART_TYPEID,
      INDEX_KEYWORDS_PART_SCHEMA
    );
  }

  ngOnInit() {}

  public onCodeSaved() {
    this.currentTabIndex = 1;
  }

  public onEditorSaved() {
    this.currentTabIndex = 0;
  }
}
