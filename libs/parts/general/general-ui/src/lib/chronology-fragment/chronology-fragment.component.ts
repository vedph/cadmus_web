import { Component, OnInit } from '@angular/core';
import { ModelEditorComponentBase } from '@cadmus/ui';
import { ChronologyFragment } from '../chronology-fragment';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Datation, HistoricalDate, HistoricalDateType, ThesaurusEntry } from '@cadmus/core';
import { AuthService } from '@cadmus/api';

/**
 * Chronology fragment editor component.
 * Thesauri: "chronology-tags" when you want to use a closed set of tags.
 */
@Component({
  selector: 'cadmus-chronology-fragment',
  templateUrl: './chronology-fragment.component.html',
  styleUrls: ['./chronology-fragment.component.css']
})
export class ChronologyFragmentComponent
  extends ModelEditorComponentBase<ChronologyFragment>
  implements OnInit {
  public fragment: ChronologyFragment;
  public tagEntries: ThesaurusEntry[];

  // the date being edited in its text form
  public txtDate: FormControl;
  // true if editing a range (A and B)
  public range: FormControl;
  // the A and B datations being edited
  public a: Datation;
  public b: Datation;

  public tag: FormControl;
  public tags: FormControl;
  public label: FormControl;
  public eventId: FormControl;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    this.a = new Datation();
    this.b = new Datation();
    // form
    this.txtDate = formBuilder.control(null, Validators.required);
    this.range = formBuilder.control(false);
    this.tag = formBuilder.control(null, Validators.maxLength(100));
    this.tags = formBuilder.control([]);
    this.label = formBuilder.control(null, Validators.maxLength(150));
    this.eventId = formBuilder.control(null, Validators.maxLength(300));
    this.form = formBuilder.group({
      txtDate: this.txtDate,
      range: this.range,
      tag: this.tag,
      tags: this.tags,
      label: this.label,
      eventId: this.eventId
    });
  }

  ngOnInit() {
    this.initEditor();
  }

  protected onThesauriSet() {
    const key = 'chronology-tags';
    if (this.thesauri && this.thesauri[key]) {
      this.tagEntries = this.thesauri[key].entries;
    } else {
      this.tagEntries = null;
    }
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

  protected onModelSet(model: ChronologyFragment) {
    if (!model || !model.date) {
      this.form.reset();
    } else {
      // date
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
      // label and tag
      this.label.setValue(model.label);
      this.tag.setValue(model.tag);
      this.eventId.setValue(model.eventId);
      this.tags.setValue(model.tag);
      this.form.markAsPristine();
    }
  }

  protected getModelFromForm(): ChronologyFragment {
    let fr = this.getModelFromJson();
    if (!fr) {
      fr = {
        location: null,
        date: null
      };
    }
    fr.date = new HistoricalDate();
    fr.date.a = this.a;
    fr.date.b = this.b;
    // label and tag
    fr.label = this.label.value?.trim();
    fr.eventId = this.eventId.value?.trim();
    fr.tag = this.tagEntries ? this.tags.value : this.tag.value;
    return fr;
  }
}
