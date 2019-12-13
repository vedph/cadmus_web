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
  public range: FormControl;
  public txtDate: FormControl;

  public a: Datation;
  public b: Datation;

  constructor(formBuilder: FormBuilder, dialogService: DialogService) {
    super(dialogService);
    this.a = new Datation();
    this.b = new Datation();
    // form
    this.txtDate = formBuilder.control(null, Validators.required);
    this.form = formBuilder.group({
      txtDate: this.txtDate
    });
  }

  ngOnInit() {}

  public updateA(d: Datation) {
    this.a = d;
  }

  public updateB(d: Datation) {
    this.b = d;
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
        date: new HistoricalDate()
      };
    }
    return part;
  }
}
