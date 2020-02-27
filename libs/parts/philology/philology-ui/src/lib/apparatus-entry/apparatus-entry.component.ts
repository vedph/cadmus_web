import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApparatusEntry, ApparatusAnnotatedValue } from '../apparatus-fragment';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators
} from '@angular/forms';

/**
 * Single apparatus entry editor dumb component.
 */
@Component({
  selector: 'cadmus-apparatus-entry',
  templateUrl: './apparatus-entry.component.html',
  styleUrls: ['./apparatus-entry.component.css']
})
export class ApparatusEntryComponent implements OnInit {
  private _entry: ApparatusEntry;

  @Input()
  public get entry(): ApparatusEntry {
    return this._entry;
  }
  public set entry(value: ApparatusEntry) {
    if (this._entry === value) {
      return;
    }
    this._entry = value;
    this.updateForm();
  }

  @Output()
  public editorClose: EventEmitter<any>;
  @Output()
  public save: EventEmitter<ApparatusEntry>;

  public type: FormControl;
  public value: FormControl;
  public normValue: FormControl;
  public accepted: FormControl;
  public tag: FormControl;
  public groupId: FormControl;
  public note: FormControl;
  public witnesses: FormArray;
  public authors: FormArray;
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    // events
    this.editorClose = new EventEmitter<any>();
    this.save = new EventEmitter<ApparatusEntry>();
    // form
    this.type = _formBuilder.control(0, Validators.required);
    // TODO: add conditional validation according to type
    this.value = _formBuilder.control(null, Validators.maxLength(300));
    this.normValue = _formBuilder.control(null, Validators.maxLength(300));
    this.accepted = _formBuilder.control(false);
    this.tag = _formBuilder.control(null, Validators.maxLength(50));
    this.groupId = _formBuilder.control(null, Validators.maxLength(50));
    this.note = _formBuilder.control(null, Validators.maxLength(1000));
    this.witnesses = _formBuilder.array([]);
    this.authors = _formBuilder.array([]);
    this.form = _formBuilder.group({
      type: this.type,
      value: this.value,
      normValue: this.normValue,
      accepted: this.accepted,
      tag: this.tag,
      groupId: this.groupId,
      note: this.note,
      witnesses: this.witnesses,
      authors: this.authors
    });
  }

  ngOnInit(): void {}

  private updateForm() {
    if (!this._entry) {
      this.form.reset();
      return;
    }
    this.type.setValue(this._entry.type);
    this.value.setValue(this._entry.value);
    this.normValue.setValue(this._entry.normValue);
    this.accepted.setValue(this._entry.isAccepted === true);
    this.tag.setValue(this._entry.tag);
    this.groupId.setValue(this._entry.groupId);
    this.note.setValue(this._entry.note);

    this.witnesses.clear();
    if (this._entry.witnesses) {
      for (let i = 0; i < this._entry.witnesses.length; i++) {
        this.addWitness(this._entry.witnesses[i]);
      }
    }

    this.authors.clear();
    if (this._entry.authors) {
      for (let i = 0; i < this._entry.authors.length; i++) {
        this.addAuthor(this._entry.authors[i]);
      }
    }
    this.form.markAsPristine();
  }

  private updateEntry() {
    this._entry.type = this.type.value;
    this._entry.value = this.value.value?.trim();
    this._entry.normValue = this.normValue.value?.trim();
    this._entry.isAccepted = this.accepted.value === true;
    this._entry.tag = this.tag.value?.trim();
    this._entry.groupId = this.groupId.value?.trim();
    this._entry.note = this.note.value?.trim();

    this._entry.witnesses = [];
    for (let i = 0; i < this.witnesses.length; i++) {
      this._entry.witnesses.push({
        value: this.witnesses.controls[i].value?.trim(),
        note: this.witnesses.controls[i].value,
      });
    }

    this._entry.authors = [];
    for (let i = 0; i < this.authors.length; i++) {
      this._entry.authors.push({
        value: this.authors.controls[i].value?.trim(),
        note: this.authors.controls[i].value,
      });
    }
  }

  private getAnnotatedValueGroup(preset?: ApparatusAnnotatedValue): FormGroup {
    return this._formBuilder.group({
      value: this._formBuilder.control(preset?.value, [
        Validators.required,
        Validators.maxLength(50)]),
      note: this._formBuilder.control(preset?.note, Validators.maxLength(100))
    });
  }

  public addWitness(witness?: ApparatusAnnotatedValue) {
    this.witnesses.push(this.getAnnotatedValueGroup(witness));
    this.form.markAsDirty();
  }

  public addAuthor(author?: ApparatusAnnotatedValue) {
    this.authors.push(this.getAnnotatedValueGroup(author));
    this.form.markAsDirty();
  }

  public removeWitness(index: number) {
    this.witnesses.removeAt(index);
    this.form.markAsDirty();
  }

  public removeAuthor(index: number) {
    this.authors.removeAt(index);
    this.form.markAsDirty();
  }

  public moveWitnessUp(index: number) {
    if (index < 1) {
      return;
    }
    const grp = this.witnesses.controls[index];
    this.witnesses.removeAt(index);
    this.witnesses.insert(index - 1, grp);
    this.form.markAsDirty();
  }

  public moveAuthorUp(index: number) {
    if (index < 1) {
      return;
    }
    const grp = this.authors.controls[index];
    this.authors.removeAt(index);
    this.authors.insert(index - 1, grp);
    this.form.markAsDirty();
  }

  public moveWitnessDown(index: number) {
    if (index + 1 >= this.witnesses.length) {
      return;
    }
    const item = this.witnesses.controls[index];
    this.witnesses.removeAt(index);
    this.witnesses.insert(index + 1, item);
    this.form.markAsDirty();
  }

  public moveAuthorDown(index: number) {
    if (index + 1 >= this.authors.length) {
      return;
    }
    const item = this.authors.controls[index];
    this.authors.removeAt(index);
    this.authors.insert(index + 1, item);
    this.form.markAsDirty();
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
