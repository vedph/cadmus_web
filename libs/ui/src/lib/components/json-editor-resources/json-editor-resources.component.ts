import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { take } from 'rxjs/operators';
import { JsonValidators } from '../../validators/json-validators';
import { JsonSchemaService } from '@cadmus/core';
import { JsonSchemaValidators } from '../../validators/json-schema-validators';

/**
 * JSON resources for parts/fragments editors. This component is used
 * in editor playgrounds, to allow users to provide/retrieve JSON data
 * to/from editors. Any editor has a "json" property representing the
 * data model being edited, plus a "thesauri" property representing
 * all the thesauri (entries sets) to be eventually used in the editor.
 * Using this control, you can edit the JSON code for both these
 * resources.
 */
@Component({
  selector: 'cadmus-json-editor-resources',
  templateUrl: './json-editor-resources.component.html',
  styleUrls: ['./json-editor-resources.component.css']
})
export class JsonEditorResourcesComponent implements OnInit {
  private _partJson: string;
  private _thesauriJson: string;
  // validation
  private _schemaName: string;

  @Input()
  public get partJson(): string {
    return this._partJson;
  }
  public set partJson(value: string) {
    if (this._partJson === value) {
      return;
    }
    this._partJson = value;
    this.part.setValue(value);
    this.part.markAsPristine();
  }

  @Input()
  public get thesauriJson(): string {
    return this._thesauriJson;
  }
  public set thesauriJson(value: string) {
    if (this._thesauriJson === value) {
      return;
    }
    this._thesauriJson = value;
    this.thesauri.setValue(value);
    this.thesauri.markAsPristine();
  }

  @Input()
  public title: string;
  @Input()
  public get schemaName(): string {
    return this._schemaName;
  }
  public set schemaName(value: string) {
    if (this._schemaName === value) {
      return;
    }
    this._schemaName = value;
    this.updatePartValidators();
  }

  @Output()
  public partJsonChange: EventEmitter<string>;
  @Output()
  public thesauriJsonChange: EventEmitter<string>;

  public editorOptions = {
    theme: 'vs-light',
    language: 'json',
    // automaticLayout: true,
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true
  };

  public form: FormGroup;
  public part: FormControl;
  public thesauri: FormControl;

  constructor(
    formBuilder: FormBuilder,
    private _dialog: DialogService,
    private _schemaService: JsonSchemaService
  ) {
    const THESAURI_SCHEMA_NAME = '@thesauri';
    // TODO: create schema using patternProperties
    // https://stackoverflow.com/questions/32044761/json-schema-with-unknown-property-names
    const THESAURI_SCHEMA = {};

    // events
    this.partJsonChange = new EventEmitter<string>();
    this.thesauriJsonChange = new EventEmitter<string>();
    // thesauri schema
    _schemaService.addSchema(THESAURI_SCHEMA_NAME, THESAURI_SCHEMA);
    // form
    this.part = formBuilder.control(null, JsonValidators.json);
    this.thesauri = formBuilder.control(null,
      JsonSchemaValidators.create(this._schemaService, '@thesauri'));
    this.form = formBuilder.group({
      part: this.part,
      thesauri: this.thesauri
    });
  }

  ngOnInit() {}

  private updatePartValidators() {
    this.part.clearValidators();

    if (this._schemaName) {
      this.part.setValidators(
        JsonSchemaValidators.create(this._schemaService, this._schemaName)
      );
    } else {
      this.part.setValidators(JsonValidators.json);
    }
  }

  private prettifyJson(json: string): string {
    try {
      const p = JSON.parse(json);
      return JSON.stringify(p, null, 4);
    } catch {
      console.error('Error parsing JSON');
      return json;
    }
  }

  public prettifyPartJson() {
    if (this.part.invalid) {
      return;
    }
    this.part.setValue(this.prettifyJson(this.part.value));
  }

  public prettifyThesauriJson() {
    if (this.thesauri.invalid) {
      return;
    }
    this.thesauri.setValue(this.prettifyJson(this.thesauri.value));
  }

  public clear() {
    this._dialog
      .confirm('Warning', 'Clear the whole code?')
      .pipe(take(1))
      .subscribe((ok: boolean) => {
        if (ok) {
          this.form.reset();
        }
      });
  }

  public apply() {
    if (this.form.invalid) {
      return;
    }
    this.partJsonChange.emit(this.part.value);
    this.thesauriJsonChange.emit(this.thesauri.value);
  }
}
