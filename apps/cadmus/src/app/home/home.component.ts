import { Component, OnInit } from '@angular/core';
import { OrthographyFragment } from '@cadmus/parts/philology/philology-ui';
import { JsonSchemaService } from '@cadmus/core';
import { NOTE_PART_SCHEMA } from '@cadmus/parts/general/general-ui';

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

  ngOnInit() {
  }

  public onCodeSaved() {
    this.currentTabIndex = 1;
  }

  public onEditorSaved() {
    this.currentTabIndex = 0;
  }

  public validateJson() {
    this._schema.addSchema('note', NOTE_PART_SCHEMA);
    const result = this._schema.validateData('note', {tag:"tag",text:"text"});
    console.log(JSON.stringify(result));
  }
}
