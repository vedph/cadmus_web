import { Component, OnInit, Input } from '@angular/core';
import { TOKEN_TEXT_PART_TYPEID, TOKEN_TEXT_PART_SCHEMA } from '../..';
import { ThesauriSet, JsonSchemaService } from '@cadmus/core';

@Component({
  selector: 'cadmus-token-text-part-demo',
  templateUrl: './token-text-part-demo.component.html',
  styleUrls: ['./token-text-part-demo.component.css']
})
export class TokenTextPartDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = TOKEN_TEXT_PART_TYPEID;
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
    schemaService.addSchema(TOKEN_TEXT_PART_TYPEID, TOKEN_TEXT_PART_SCHEMA);
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
