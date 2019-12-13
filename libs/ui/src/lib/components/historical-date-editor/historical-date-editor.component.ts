import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HistoricalDate, Datation, HistoricalDateType } from '@cadmus/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'cadmus-historical-date-editor',
  templateUrl: './historical-date-editor.component.html',
  styleUrls: ['./historical-date-editor.component.css']
})
export class HistoricalDateEditorComponent implements OnInit {
  private _date: HistoricalDate;
  public a: Datation;
  public b: Datation;
  public range: FormControl;
  public dateGroup: FormGroup;
  public error: string;

  @Input() set date(value: HistoricalDate) {
    this._date = new HistoricalDate();
    this._date.a = value && value.a ? new Datation(value.a) : null;
    this._date.b = value && value.b ? new Datation(value.b) : null;
    this.range.setValue(this._date.getDateType() === HistoricalDateType.range);
    this.error = this._date.validate();

    this.a = this._date.a || new Datation();
    this.b = this._date.b || new Datation();
  }
  @Output() dateChange: EventEmitter<HistoricalDate>;

  constructor(formBuilder: FormBuilder, private _snackbar: MatSnackBar) {
    this.dateChange = new EventEmitter<HistoricalDate>();
    this.a = new Datation();
    this.b = new Datation();

    // form
    this.range = formBuilder.control(false);
    this.dateGroup = formBuilder.group({
      range: this.range
    });
  }

  ngOnInit() {}

  public updateA(d: Datation) {
    this.a = d;
  }

  public updateB(d: Datation) {
    this.b = d;
  }

  public save() {
    // do not save an undefined date
    if (this.a.isUndefined() && this.b.isUndefined()) {
      this.error = 'Undefined date';
      return;
    }
    // do not save an invalid date
    this._date = new HistoricalDate();
    this._date.a = this.a;
    this._date.b = this.b;
    this.error = this._date.validate();
    if (this.error) {
      return;
    }
    // save
    this.dateChange.emit(this._date);
    this.dateGroup.markAsPristine();
  }
}
