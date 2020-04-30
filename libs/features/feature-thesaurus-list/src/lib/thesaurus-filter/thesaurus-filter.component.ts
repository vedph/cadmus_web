import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThesaurusFilter } from '@cadmus/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'cadmus-thesaurus-filter',
  templateUrl: './thesaurus-filter.component.html',
  styleUrls: ['./thesaurus-filter.component.css']
})
export class ThesaurusFilterComponent implements OnInit {
  @Input()
  public filter$: BehaviorSubject<ThesaurusFilter>;

  public id: FormControl;
  public alias: FormControl;
  public language: FormControl;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.id = formBuilder.control('id');
    this.alias = formBuilder.control(null);
    this.language = formBuilder.control(
      null,
      Validators.pattern(/^[a-z]{2,3}$/g)
    );
    this.form = formBuilder.group({
      id: this.id,
      alias: this.alias,
      language: this.language
    });
  }

  ngOnInit(): void {
    // update form when filter changes
    this.filter$.subscribe(f => {
      this.updateForm(f);
    });
  }

  private updateForm(filter: ThesaurusFilter) {
    this.id.setValue(filter.id);
    this.alias.setValue(filter.isAlias);
    this.language.setValue(filter.language);
    this.form.markAsPristine();
  }

  private getFilter(): ThesaurusFilter {
    return {
      pageNumber: 0,
      pageSize: 0,
      id: this.id.value,
      isAlias: this.alias.value,
      language: this.language.value
    };
  }

  public reset() {
    this.form.reset();
    this.apply();
  }

  public apply() {
    if (this.form.invalid) {
      return;
    }
    const filter = this.getFilter();
    this.filter$.next(filter);
  }
}
