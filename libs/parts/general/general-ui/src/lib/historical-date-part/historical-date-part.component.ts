import { Component, OnInit } from '@angular/core';
import {
  HistoricalDatePart,
  HISTORICAL_DATE_PART_TYPEID,
} from '../historical-date-part';
import { ModelEditorComponentBase } from '@cadmus/ui';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { HistoricalDate, Datation, HistoricalDateType } from '@cadmus/core';
import { AuthService } from '@cadmus/api';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'cadmus-historical-date-part',
  templateUrl: './historical-date-part.component.html',
  styleUrls: ['./historical-date-part.component.css'],
})
export class HistoricalDatePartComponent
  extends ModelEditorComponentBase<HistoricalDatePart>
  implements OnInit {
  private _updatingText: boolean;

  // the date being edited in its text form
  public dateText: FormControl;
  public textForm: FormGroup;
  // true if editing a range (A and B)
  public range: FormControl;
  // the A and B datations being edited
  public a: Datation;
  public b: Datation;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    this.a = new Datation();
    this.b = new Datation();

    this.textForm = formBuilder.group({
      dateText: this.dateText,
    });

    // form
    this.dateText = formBuilder.control(null, Validators.required);
    this.range = formBuilder.control(false);
    this.form = formBuilder.group({
      range: this.range,
    });
  }

  ngOnInit() {
    this.initEditor();
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((_) => {
      if (!this._updatingText) {
        this._updatingText = true;
        this.dateText.setValue(this.getModelFromForm()?.date?.toString());
        this._updatingText = false;
      }
    });
    this.range.valueChanges.subscribe(_ => {
      if (!this.range.value) {
        this.b = null;
      } else {
        if (!this.b) {
          this.b = new Datation();
        }
      }
    });
  }

  public parseDateText() {
    if (!this.dateText.value) {
      this.a = new Datation();
      this.b = new Datation();
      this.range.reset();
      return;
    }
    const parsed = HistoricalDate.parse(this.dateText.value);
    this.a = parsed.a;
    this.b = parsed.b;
    this.range.setValue(parsed.getDateType() === HistoricalDateType.range);
  }

  // invoked when A editor saves
  public updateA(d: Datation) {
    this.a = d;
    const model = this.getModelFromForm();
    this.dateText.setValue(model.date.toString());
    this.form.markAsDirty();
  }

  // invoked when B editor saves
  public updateB(d: Datation) {
    this.b = d;
    const model = this.getModelFromForm();
    this.dateText.setValue(model.date.toString());
    this.form.markAsDirty();
  }

  protected onModelSet(model: HistoricalDatePart) {
    if (!model || !model.date) {
      this.textForm.reset();
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
      this.dateText.setValue(d.toString());
      this.form.markAsPristine();
    }
  }

  protected getModelFromForm(): HistoricalDatePart {
    let part = this.getModelFromJson();
    if (!part) {
      part = {
        itemId: this.itemId,
        id: null,
        typeId: HISTORICAL_DATE_PART_TYPEID,
        roleId: this.roleId,
        timeCreated: new Date(),
        creatorId: null,
        timeModified: new Date(),
        userId: null,
        date: null,
      };
    }
    part.date = new HistoricalDate();
    part.date.a = this.a;
    part.date.b = this.b;
    return part;
  }
}
