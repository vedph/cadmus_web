import { Component, OnInit } from '@angular/core';
import {
  HistoricalDatePart,
  HISTORICAL_DATE_PART_TYPEID
} from '../historical-date-part';
import { ModelEditorComponentBase, DialogService } from '@cadmus/ui';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HistoricalDate } from '@cadmus/core';

@Component({
  selector: 'cadmus-historical-date-part',
  templateUrl: './historical-date-part.component.html',
  styleUrls: ['./historical-date-part.component.css']
})
export class HistoricalDatePartComponent
  extends ModelEditorComponentBase<HistoricalDatePart>
  implements OnInit {
  public txtDate: FormControl;
  public date: HistoricalDate;

  constructor(formBuilder: FormBuilder, dialogService: DialogService) {
    super(dialogService);
    this.date = new HistoricalDate();
    // form
    this.txtDate = formBuilder.control(null, Validators.required);
    this.form = formBuilder.group({
      txtDate: this.txtDate
    });
  }

  ngOnInit() {}

  protected onModelSet(model: HistoricalDatePart) {
    if (!model) {
      this.form.reset();
    } else {
      this.txtDate.setValue(model.date.toString());
      this.date = model.date;
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
        date: new HistoricalDate()
      };
    }
    return part;
  }

  public onDateChange(date: HistoricalDate) {
    this.date = date;
    this.txtDate.setValue(date.toString());
    this.txtDate.markAsDirty();
  }
}
