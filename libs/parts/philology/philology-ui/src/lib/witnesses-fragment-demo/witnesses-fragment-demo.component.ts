import { Component, OnInit, Input } from '@angular/core';
import { JsonSchemaService, ThesauriSet } from '@cadmus/core';
import {
  WITNESSES_FRAGMENT_TYPEID,
  WITNESSES_FRAGMENT_SCHEMA
} from '../witnesses.fragment';

@Component({
  selector: 'cadmus-witnesses-fragment-demo',
  templateUrl: './witnesses-fragment-demo.component.html',
  styleUrls: ['./witnesses-fragment-demo.component.css']
})
export class WitnessesFragmentDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = WITNESSES_FRAGMENT_TYPEID;
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
      WITNESSES_FRAGMENT_TYPEID,
      WITNESSES_FRAGMENT_SCHEMA
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
