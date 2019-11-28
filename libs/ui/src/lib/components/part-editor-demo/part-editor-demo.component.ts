import { Component, OnInit, Input, ContentChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { PartEditorBaseComponent } from '../part-editor-base/part-editor-base.component';

@Component({
  selector: 'cadmus-part-editor-demo',
  templateUrl: './part-editor-demo.component.html',
  styleUrls: ['./part-editor-demo.component.css']
})
export class PartEditorDemoComponent implements OnInit {
  private _json: string;

  // the ng-content child editor must be decorated with #editor!
  // (this is not a CSS selector:
  // https://stackoverflow.com/questions/51673978/how-do-i-select-a-contentchild-of-a-native-element-in-angular-6)
  @ContentChild('editor', { static: true })
   private _editor: PartEditorBaseComponent;

  /**
   * The JSON code representing the part being edited.
   */
  @Input()
  public get json(): string {
    return this._json;
  }
  public set json(value: string) {
    if (this._json === value) {
      return;
    }
    this._json = value;
  }

  public editorOptions = {
    theme: 'vs-light',
    language: 'json',
    // automaticLayout: true,
    wordWrap: 'on'
  };

  public codeForm: FormGroup;
  public jsonEditor: FormControl;

  constructor(formBuilder: FormBuilder) {
    this.jsonEditor = formBuilder.control(null);
    this.codeForm = formBuilder.group({
      jsonEditor: this.jsonEditor
    });
  }

  ngOnInit() {
    // subscribe to the editor JSON change event
    https://stackoverflow.com/questions/41858516/capturing-events-emitted-from-components-inside-ng-content
    this._editor.jsonChange.subscribe((json: string) => {
      this.jsonEditor.setValue(json);
    });
  }

  public setJsonFromCode() {
    if (this.codeForm.invalid) {
      return;
    }
    this.json = this.jsonEditor.value;
  }
}
