import { Component, OnInit } from '@angular/core';
import { JsonSchemaService } from '@cadmus/core';
import { NOTE_PART_TYPEID, NOTE_PART_SCHEMA } from '../models';

@Component({
  selector: 'cadmus-note-part-demo',
  templateUrl: './note-part-demo.component.html',
  styleUrls: ['./note-part-demo.component.css']
})
export class NotePartDemoComponent implements OnInit {
  public currentTabIndex: number;
  public partJson: string;
  public thesauriJson: string;
  public schemaName = NOTE_PART_TYPEID;

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
