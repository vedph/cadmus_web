import { Component, OnInit, Input } from '@angular/core';
import {
  HISTORICAL_DATE_PART_TYPEID,
  HISTORICAL_DATE_PART_SCHEMA
} from '../historical-date-part';
import { ThesauriSet, JsonSchemaService } from '@cadmus/core';

@Component({
  selector: 'cadmus-historical-date-part-demo',
  templateUrl: './historical-date-part-demo.component.html',
  styleUrls: ['./historical-date-part-demo.component.css']
})
export class HistoricalDatePartDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = HISTORICAL_DATE_PART_TYPEID;
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
      HISTORICAL_DATE_PART_TYPEID,
      HISTORICAL_DATE_PART_SCHEMA
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
