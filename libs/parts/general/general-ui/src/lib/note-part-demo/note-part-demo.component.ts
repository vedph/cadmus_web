import { Component, OnInit, Input } from '@angular/core';
import { JsonSchemaService, Thesaurus } from '@cadmus/core';
import { NOTE_PART_TYPEID, NOTE_PART_SCHEMA } from '../models';

@Component({
  selector: 'cadmus-note-part-demo',
  templateUrl: './note-part-demo.component.html',
  styleUrls: ['./note-part-demo.component.css']
})
export class NotePartDemoComponent implements OnInit {
  private _thesauriJson: string;

  public currentTabIndex: number;
  public schemaName = NOTE_PART_TYPEID;
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
    schemaService.addSchema(NOTE_PART_TYPEID, NOTE_PART_SCHEMA);
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
