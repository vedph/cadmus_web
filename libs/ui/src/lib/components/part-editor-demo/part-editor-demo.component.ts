import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'cadmus-part-editor-demo',
  templateUrl: './part-editor-demo.component.html',
  styleUrls: ['./part-editor-demo.component.css']
})
export class PartEditorDemoComponent implements OnInit {
  private _partJson: string;

  // the ng-content child editor must be decorated with #editor!
  // (this is not a CSS selector:
  // https://stackoverflow.com/questions/51673978/how-do-i-select-a-contentchild-of-a-native-element-in-angular-6)
  @ContentChild('editor', { static: true })
  private _editor;

  @Input()
  public get partJson(): string {
    return this._partJson;
  }
  public set partJson(value: string) {
    if (this._partJson === value) {
      return;
    }
    this._partJson = value;
    // TODO: setup UI
  }

  public editorOptions = {
    theme: 'vs-light',
    language: 'json',
    // automaticLayout: true,
    wordWrap: 'on'
  };

  public codeForm: FormGroup;
  public json: FormControl;

  constructor(formBuilder: FormBuilder) {
    this.json = formBuilder.control(null);
    this.codeForm = formBuilder.group({
      json: this.json
    });
  }

  ngOnInit() {
    // subscribe to the editor JSON change event
    // https://stackoverflow.com/questions/41858516/capturing-events-emitted-from-components-inside-ng-content
    // TODO:
  }

  public setJson() {

    // TODO: set JSON
  }
}
