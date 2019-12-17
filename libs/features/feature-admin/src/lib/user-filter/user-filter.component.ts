import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

export interface UserFilter {
  pageNumber: number;
  pageSize: number;
  name?: string;
}

@Component({
  selector: 'cadmus-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {
  @Input()
  public filter$: BehaviorSubject<UserFilter>;

  public name: FormControl;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.name = formBuilder.control(null);
    this.form = formBuilder.group({
      name: this.name
    });
  }

  ngOnInit() {
    // update form when filter changes
    this.filter$.subscribe(f => {
      this.updateForm(f);
    });
  }

  private updateForm(filter: UserFilter) {
    this.name.setValue(filter.name);
    this.form.markAsPristine();
  }

  private getFilter(): UserFilter {
    return {
      pageNumber: 0,
      pageSize: 0,
      name: this.name.value
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
