import { Component, OnInit } from '@angular/core';
import {
  HistoricalDatePart,
  HISTORICAL_DATE_PART_TYPEID
} from '../historical-date-part';
import { ModelEditorComponentBase, DialogService } from '@cadmus/ui';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HistoricalDate, Datation, HistoricalDateType } from '@cadmus/core';

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

  constructor(formBuilder: FormBuilder, dialogService: DialogService) {
    super(dialogService);
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

  ngOnInit() {}

  // invoked when A editor saves
  public updateA(d: Datation) {
    this.a = d;
    const model = this.getModelFromForm();
    this.txtDate.setValue(model.date.toString());
    this.txtDate.markAsDirty();
  }

  // invoked when B editor saves
  public updateB(d: Datation) {
    this.b = d;
    const model = this.getModelFromForm();
    this.txtDate.setValue(model.date.toString());
    this.txtDate.markAsDirty();
  }

  protected onModelSet(model: HistoricalDatePart) {
    if (!model || !model.date) {
      this.form.reset();
    } else {
      this.a = model.date.a;
      this.b = model.date.b;
      this.range.setValue(
        model.date.getDateType() === HistoricalDateType.range
      );
      this.txtDate.setValue(model.date.toString());
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
