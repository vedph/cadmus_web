import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Thesaurus } from '@cadmus/core';
import { IndexKeyword } from '../index-keywords-part';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'cadmus-index-keyword',
  templateUrl: './index-keyword.component.html',
  styleUrls: ['./index-keyword.component.css']
})
export class IndexKeywordComponent implements OnInit {
  private _keyword: IndexKeyword;

  @Input()
  public get keyword(): IndexKeyword {
    return this._keyword;
  }
  public set keyword(value: IndexKeyword) {
    this._keyword = value;
    this.updateForm();
  }

  @Input()
  public indexIdThesaurus: Thesaurus | null;
  @Input()
  public langThesaurus: Thesaurus | null;

  @Output()
  public editorClose: EventEmitter<any>;
  @Output()
  public save: EventEmitter<IndexKeyword>;

  public indexId: FormControl;
  public language: FormControl;
  public value: FormControl;
  public note: FormControl;
  public tag: FormControl;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    // events
    this.editorClose = new EventEmitter<any>();
    this.save = new EventEmitter<IndexKeyword>();
    // form
    this.indexId = formBuilder.control(null, [
      Validators.maxLength(50),
      Validators.pattern(/^[-.a-zA-Z0-9_]{0,50}$/)
    ]);
    this.language = formBuilder.control(null, [
      Validators.pattern(/^[a-z]{3}$/)
    ]);
    this.value = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(100)
    ]);
    this.note = formBuilder.control(null, Validators.maxLength(200));
    this.tag = formBuilder.control(null, Validators.maxLength(100));
    this.form = formBuilder.group({
      indexId: this.indexId,
      language: this.language,
      value: this.value,
      note: this.note,
      tag: this.tag
    });
  }

  ngOnInit(): void {}

  private updateForm() {
    if (!this._keyword) {
      this.form.reset();
      return;
    }
    this.indexId.setValue(this._keyword.indexId);
    this.language.setValue(this._keyword.language);
    this.value.setValue(this._keyword.value);
    this.note.setValue(this._keyword.note);
    this.tag.setValue(this._keyword.tag);
    this.form.markAsPristine();
  }

  private tryTrim(value: string): string {
    return value ? value.trim() : value;
  }

  private getKeyword(): IndexKeyword {
    return {
      indexId: this.tryTrim(this.indexId.value),
      language: this.tryTrim(this.language.value),
      value: this.tryTrim(this.value.value),
      note: this.tryTrim(this.note.value),
      tag: this.tryTrim(this.tag.value)
    };
  }

  public cancel() {
    this.editorClose.emit();
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }
    this.save.emit(this.getKeyword());
  }
}
