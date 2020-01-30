import { Component, OnInit, Input } from '@angular/core';
import { TILEDTEXTPART_TYPEID, TILEDTEXTPART_SCHEMA } from '../tiled-text-part';
import { ThesauriSet, JsonSchemaService } from '@cadmus/core';

@Component({
  selector: 'cadmus-tiled-text-part-demo',
  templateUrl: './tiled-text-part-demo.component.html',
  styleUrls: ['./tiled-text-part-demo.component.css']
})
export class TiledTextPartDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = TILEDTEXTPART_TYPEID;
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
    schemaService.addSchema(TILEDTEXTPART_TYPEID, TILEDTEXTPART_SCHEMA);
  }

  ngOnInit() {}

  public onCodeSaved() {
    this.currentTabIndex = 1;
  }

  public onEditorSaved() {
    this.currentTabIndex = 0;
  }
}
