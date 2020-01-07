import { Component, OnInit } from '@angular/core';
import {
  HistoricalDatePart,
  HISTORICAL_DATE_PART_TYPEID
} from '../historical-date-part';
import { ModelEditorComponentBase } from '@cadmus/ui';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HistoricalDate, Datation, HistoricalDateType } from '@cadmus/core';
import { AuthService } from '@cadmus/api';

@Component({
  selector: 'cadmus-historical-date-part',
  templateUrl: './historical-date-part.component.html',
  styleUrls: ['./historical-date-part.component.css']
})
export class HistoricalDatePartComponent
  extends ModelEditorComponentBase<HistoricalDatePart>
  implements OnInit {
  // the date being edited in its text form
  public txtDate: FormControl;
  // true if editing a range (A and B)
  public range: FormControl;
  // the A and B datations being edited
  public a: Datation;
  public b: Datation;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    this.a = new Datation();
    this.b = new Datation();
    // form
    this.txtDate = formBuilder.control(null, Validators.required);
    this.range = formBuilder.control(false);
    this.form = formBuilder.group({
      range: this.range,
      txtDate: this.txtDate
    });
  }

  ngOnInit() {
    this.initEditor();
  }

  // invoked when A editor saves
  public updateA(d: Datation) {
    this.a = d;
    const model = this.getModelFromForm();
    this.txtDate.markAsDirty();
    this.txtDate.setValue(model.date.toString());
  }

  // invoked when B editor saves
  public updateB(d: Datation) {
    this.b = d;
    const model = this.getModelFromForm();
    this.txtDate.markAsDirty();
    this.txtDate.setValue(model.date.toString());
  }

  protected onModelSet(model: HistoricalDatePart) {
    if (!model || !model.date) {
      this.form.reset();
    } else {
      const d = Object.assign(new HistoricalDate(), model.date);
      if (model.date.a) {
        d.a = Object.assign(new Datation(), d.a);
      }
      if (model.date.b) {
        d.b = Object.assign(new Datation(), d.b);
      }
      this.a = d.a;
      this.b = d.b;
      this.range.setValue(d.getDateType() === HistoricalDateType.range);
      this.txtDate.setValue(d.toString());
      this.form.markAsPristine();
    }
  }

  protected getModelFromForm(): HistoricalDatePart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: null,
        id: null,
        typeId: HISTORICAL_DATE_PART_TYPEID,
        roleId: null,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        date: null
      };
    }
    part.date = new HistoricalDate();
    part.date.a = this.a;
    part.date.b = this.b;
    return part;
  }
}
