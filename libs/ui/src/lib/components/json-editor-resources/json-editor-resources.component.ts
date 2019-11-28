import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { take } from 'rxjs/operators';
import { JsonValidators } from '../../validators/json-validators';

@Component({
  selector: 'cadmus-json-editor-resources',
  templateUrl: './json-editor-resources.component.html',
  styleUrls: ['./json-editor-resources.component.css']
})
export class JsonEditorResourcesComponent implements OnInit {
  private _partJson: string;
  private _thesauriJson: string;

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

  @Output()
  public partJsonChange: EventEmitter<string>;
  @Output()
  public thesauriJsonChange: EventEmitter<string>;

  public editorOptions = {
    theme: 'vs-light',
    language: 'json',
    // automaticLayout: true,
    wordWrap: 'on'
  };

  public form: FormGroup;
  public part: FormControl;
  public thesauri: FormControl;

  constructor(formBuilder: FormBuilder,
    private _dialog: DialogService) {
    // events
    this.partJsonChange = new EventEmitter<string>();
    this.thesauriJsonChange = new EventEmitter<string>();
    // form
    this.part = formBuilder.control(null, JsonValidators.json);
    this.thesauri = formBuilder.control(null, JsonValidators.json);
    this.form = formBuilder.group({
      part: this.part,
      thesauri: this.thesauri
    });
  }

  ngOnInit() {
  }

  public clear() {
    this._dialog.confirm('Warning', 'Clear the whole code?')
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
