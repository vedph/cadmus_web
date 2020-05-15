import { Component, OnInit, Input } from '@angular/core';
import { ThesauriSet, JsonSchemaService } from '@cadmus/core';
import {
  BIBLIOGRAPHY_PART_TYPEID,
  BIBLIOGRAPHY_PART_SCHEMA
} from '../bibliography-part';

@Component({
  selector: 'cadmus-bibliography-part-demo',
  templateUrl: './bibliography-part-demo.component.html',
  styleUrls: ['./bibliography-part-demo.component.css']
})
export class BibliographyPartDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = BIBLIOGRAPHY_PART_TYPEID;
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
    schemaService.addSchema(BIBLIOGRAPHY_PART_TYPEID, BIBLIOGRAPHY_PART_SCHEMA);
  }

  ngOnInit() {}

  public onCodeSaved() {
    this.currentTabIndex = 1;
  }

  public onEditorSaved() {
    this.currentTabIndex = 0;
  }
}
