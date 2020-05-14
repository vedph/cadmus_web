import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BibEntry } from '../bibliography-part';
import { Thesaurus } from '@cadmus/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'cadmus-bibliography-entry',
  templateUrl: './bibliography-entry.component.html',
  styleUrls: ['./bibliography-entry.component.css']
})
export class BibliographyEntryComponent implements OnInit {
  private _entry: BibEntry;

  @Input()
  public get entry(): BibEntry {
    return this._entry;
  }
  public set entry(value: BibEntry) {
    if (this._entry === value) {
      return;
    }
    this._entry = value;
    this.updateForm();
  }

  @Input()
  public langThesaurus: Thesaurus | null;
  @Input()
  public typeThesaurus: Thesaurus | null;
  @Input()
  public roleThesaurus: Thesaurus | null;

  @Output()
  public editorClose: EventEmitter<any>;
  @Output()
  public save: EventEmitter<BibEntry>;

  public type: FormControl;
  public language: FormControl;
  // TODO:
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    // events
    this.editorClose = new EventEmitter<any>();
    this.save = new EventEmitter<BibEntry>();
    // form
    this.type = _formBuilder.control(null, Validators.required);
    this.language = _formBuilder.control(null, Validators.required);
    // TODO:
    this.form = _formBuilder.group({
      type: this.type,
      language: this.language
    });
  }

  ngOnInit(): void {}

  private updateForm() {
    if (!this._entry) {
      this.form.reset();
      return;
    }

    // TODO:
    this.form.markAsPristine();
  }

  private updateEntry() {
    // TODO:
  }

  public cancel() {
    this.editorClose.emit();
  }

  public submit() {
    if (this.form.invalid) {
      return;
    }
    this.updateEntry();
    this.save.emit(this._entry);
  }
}
