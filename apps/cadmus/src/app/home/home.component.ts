import { Component, OnInit } from '@angular/core';
import { OrthographyFragment } from '@cadmus/parts/philology/philology-ui';
import { JsonSchemaService } from '@cadmus/core';
import { NOTE_PART_SCHEMA, NotePart } from '@cadmus/parts/general/general-ui';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currentTabIndex: number;
  public partJson: string;
  public thesauriJson: string;

  constructor(private _schema: JsonSchemaService) {
    this.currentTabIndex = 0;
  }

  ngOnInit() {}

  public onCodeSaved() {
    this.currentTabIndex = 1;
  }

  public onEditorSaved() {
    this.currentTabIndex = 0;
  }

  public validateJson() {
    this._schema.addSchema('note', NOTE_PART_SCHEMA);
    const note: NotePart = {
      id: '69fd79b6-299b-485a-9464-9c5dbcc28c5b',
      itemId: '493df6c0-aba9-425f-b960-14170202efe1',
      typeId: 'net.fusisoft.note',
      roleId: '',
      tag: 'tag',
      text: 'The note\'s text.',
      timeModified: new Date(),
      userId: 'zeus'
    };
    const result = this._schema.validateData('note', note);
    console.log(JSON.stringify(result));
  }
}
