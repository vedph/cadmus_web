import { Component, OnInit } from '@angular/core';
import { ApparatusFragment } from '../..';
import { AuthService } from '@cadmus/api';
import { ModelEditorComponentBase } from '@cadmus/ui';
import { LemmaVariantType } from '../apparatus-fragment';
import {
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'cadmus-apparatus-fragment',
  templateUrl: './apparatus-fragment.component.html',
  styleUrls: ['./apparatus-fragment.component.css']
})
export class ApparatusFragmentComponent
  extends ModelEditorComponentBase<ApparatusFragment>
  implements OnInit {
  public fragment: ApparatusFragment;
  public type: FormControl;
  public accepted: FormControl;
  public value: FormControl;
  public authors: FormControl;
  public note: FormControl;

  constructor(authService: AuthService, formBuilder: FormBuilder) {
    super(authService);
    // form
    this.type = formBuilder.control(0, Validators.required);
    this.accepted = formBuilder.control(false);
    this.value = formBuilder.control(null, Validators.maxLength(500));
    this.authors = formBuilder.control(null, [Validators.required, Validators.maxLength(500)]);
    this.note = formBuilder.control(null, Validators.maxLength(1000));
    this.form = formBuilder.group({
      type: this.type,
      accepted: this.accepted,
      value: this.value,
      authors: this.authors,
      note: this.note
    });
  }

  ngOnInit() {
    this.initEditor();
  }

  private updateForm(model: ApparatusFragment) {
    if (!model) {
      this.form.reset();
      return;
    }
    this.type.setValue(model.type);
    this.accepted.setValue(model.isAccepted);
    this.value.setValue(model.value);
    this.authors.setValue(model.authors ? model.authors.join('; ') : null);
    this.note.setValue(model.note);
    this.form.markAsPristine();
  }

  protected onModelSet(model: ApparatusFragment) {
    this.fragment = model;
    this.updateForm(model);
  }

  protected getModelFromForm(): ApparatusFragment {
    let fr = this.getModelFromJson();
    if (!fr) {
      fr = {
        location: this.fragment ? this.fragment.location : null,
        type: LemmaVariantType.replacement,
        authors: []
      };
    }
    fr.type = this.type.value;
    fr.isAccepted = this.accepted.value;
    fr.value = this.trimIfAny(this.value.value, true);
    fr.authors = (this.authors.value ? this.authors.value.split(';') : [])
      .map((s: string) => s.trim())
      .filter((s: string) => {
        return s.length > 0;
      });
    fr.note = this.trimIfAny(this.note.value);
    return fr;
  }
}
