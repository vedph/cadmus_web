import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Datation } from '@cadmus/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cadmus-datation-editor',
  templateUrl: './datation-editor.component.html',
  styleUrls: ['./datation-editor.component.css']
})
export class DatationEditorComponent implements OnInit {
  private _datation: Datation;
  private _updatingText: boolean;

  public inner: FormGroup;
  public value: FormControl;
  public century: FormControl;
  public span: FormControl;
  public month: FormControl;
  public day: FormControl;
  public about: FormControl;
  public dubious: FormControl;
  public hint: FormControl;
  public text: FormControl;
  public editor: FormGroup;

  @Input() public set datation(value: Datation) {
    this._datation = new Datation(value);
    this.updateForm();
  }
  @Input() public label: string;

  @Output() datationChange: EventEmitter<Datation>;

  constructor(formBuilder: FormBuilder) {
    this._datation = new Datation();
    this.datationChange = new EventEmitter<Datation>();

    this.value = formBuilder.control(0, Validators.required);
    this.century = formBuilder.control(false);
    this.span = formBuilder.control(false);
    this.month = formBuilder.control(0, [
      Validators.min(0),
      Validators.max(12)
    ]);
    this.day = formBuilder.control(0, [Validators.min(0), Validators.max(31)]);
    this.about = formBuilder.control(false);
    this.dubious = formBuilder.control(false);
    this.hint = formBuilder.control(null, Validators.maxLength(500));
    this.text = formBuilder.control(null);

    // we use a nested form as we want to listen to datation changes,
    // but excluding the changes from the text.
    this.inner = formBuilder.group({
      value: this.value,
      century: this.century,
      span: this.span,
      month: this.month,
      day: this.day,
      about: this.about,
      dubious: this.dubious,
      hint: this.hint
    });
    this.editor = formBuilder.group({
      inner: this.inner,
      text: this.text
    });

    this.inner.valueChanges.pipe(debounceTime(1000)).subscribe(_ => {
      if (this._updatingText) {
        return;
      }
      this.updateData();
      this._updatingText = true;
      this.text.setValue(this._datation.toString());
      this._updatingText = false;
    });
  }

  private updateForm() {
    this.value.setValue(this._datation.value);
    this.century.setValue(this._datation.isCentury);
    this.span.setValue(this._datation.isSpan);
    this.month.setValue(this._datation.month);
    this.day.setValue(this._datation.day);
    this.about.setValue(this._datation.isApproximate);
    this.dubious.setValue(this._datation.isDubious);
    this.hint.setValue(this._datation.hint);
    this.text.setValue(this._datation.toString());
  }

  private updateData() {
    this._datation.value = this.value.value;
    this._datation.isCentury = this.century.value;
    this._datation.isSpan = this.span.value;
    this._datation.month = this.month.value;
    this._datation.day = this.day.value;
    this._datation.isApproximate = this.about.value;
    this._datation.isDubious = this.dubious.value;
    this._datation.hint = Datation.sanitizeHint(this.hint.value);
  }

  ngOnInit() {}

  public reset() {
    this._datation.reset();
    this.updateForm();
    this.editor.markAsPristine();
  }

  public parse() {
    if (!this.text.value) {
      return;
    }
    try {
      const d = Datation.parse(this.text.value);
      this._datation = d;
      this.updateForm();
    } catch (error) {}
  }

  public save() {
    if (!this.editor.valid) {
      return;
    }
    this.updateData();
    this.datationChange.emit(this._datation);
  }
}
