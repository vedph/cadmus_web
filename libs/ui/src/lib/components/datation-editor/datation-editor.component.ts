import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Datation } from '@cadmus/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

/**
 * Editor for a single point in a historical date.
 */
@Component({
  selector: 'cadmus-datation-editor',
  templateUrl: './datation-editor.component.html',
  styleUrls: ['./datation-editor.component.css'],
})
export class DatationEditorComponent {
  private _datation: Datation;

  public value: FormControl;
  public century: FormControl;
  public span: FormControl;
  public month: FormControl;
  public day: FormControl;
  public about: FormControl;
  public dubious: FormControl;
  public hint: FormControl;
  public form: FormGroup;

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
      Validators.max(12),
    ]);
    this.day = formBuilder.control(0, [Validators.min(0), Validators.max(31)]);
    this.about = formBuilder.control(false);
    this.dubious = formBuilder.control(false);
    this.hint = formBuilder.control(null, Validators.maxLength(500));

    this.form = formBuilder.group({
      value: this.value,
      century: this.century,
      span: this.span,
      month: this.month,
      day: this.day,
      about: this.about,
      dubious: this.dubious,
      hint: this.hint,
    });

    this.form.valueChanges.pipe(debounceTime(1000)).subscribe(_ => {
      this.updateData();
    });
  }

  private updateForm(): void {
    this.value.setValue(this._datation.value);
    this.century.setValue(this._datation.isCentury);
    this.span.setValue(this._datation.isSpan);
    this.month.setValue(this._datation.month);
    this.day.setValue(this._datation.day);
    this.about.setValue(this._datation.isApproximate);
    this.dubious.setValue(this._datation.isDubious);
    this.hint.setValue(this._datation.hint);
  }

  private updateData(): void {
    this._datation.value = this.value.value ? +this.value.value : 0;
    this._datation.isCentury = this.century.value || false;
    this._datation.isSpan = this.span.value || false;
    this._datation.month = this.month.value ? +this.month.value : 0;
    this._datation.day = this.day.value ? +this.day.value : 0;
    this._datation.isApproximate = this.about.value || false;
    this._datation.isDubious = this.dubious.value || false;
    this._datation.hint = Datation.sanitizeHint(this.hint.value);
  }

  public reset(): void {
    this._datation.reset();
    this.updateForm();
    this.form.markAsPristine();
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }
    this.updateData();
    this.form.markAsPristine();
    this.datationChange.emit(this._datation);
  }
}
