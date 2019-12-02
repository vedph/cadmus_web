import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ItemFilter } from '@cadmus/core';

@Component({
  selector: 'cadmus-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.css']
})
export class ItemFilterComponent implements OnInit {
  private _filter: ItemFilter;

  @Input()
  public get filter() {
    return this._filter;
  }
  public set filter(value: ItemFilter) {
    if (this._filter === value) {
      return;
    }
    this._filter = value;
    this.updateForm(value);
  }

  @Output()
  public filterChange: EventEmitter<ItemFilter>;

  public title: FormControl;
  public description: FormControl;
  public facet: FormControl;
  public flags: FormControl;
  public minModified: FormControl;
  public maxModified: FormControl;
  public user: FormControl;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    // events
    this.filterChange = new EventEmitter<ItemFilter>();
    // form
    this.title = formBuilder.control(null);
    this.description = formBuilder.control(null);
    this.facet = formBuilder.control(null);
    this.flags = formBuilder.control(null);
    this.minModified = formBuilder.control(null);
    this.maxModified = formBuilder.control(null);
    this.user = formBuilder.control(null);

    this.form = formBuilder.group({
      title: this.title,
      description: this.description,
      facet: this.facet,
      filterFlags: this.flags,
      minModified: this.minModified,
      maxModified: this.maxModified,
      user: this.user
    });
  }

  ngOnInit() {}

  private updateForm(filter: ItemFilter) {
    this.title.setValue(filter.title);
    this.description.setValue(filter.description);
    this.facet.setValue(filter.facetId);
    this.flags.setValue(filter.flags);
    this.minModified.setValue(filter.minModified);
    this.maxModified.setValue(filter.maxModified);
    this.form.markAsPristine();
  }

  private getFilter(): ItemFilter {
    return {
      pageNumber: 0,
      pageSize: 0,
      title: this.title.value,
      description: this.description.value,
      facetId: this.facet.value ? this.facet.value.id : null,
      flags: 0, // this.getFlagsValue(),
      userId: this.user.value ? this.user.value.userName : null,
      minModified: this.minModified.value ? this.minModified.value : null,
      maxModified: this.maxModified.value ? this.maxModified.value : null
    };
  }

  public reset() {
    this.form.reset();
  }

  public apply() {
    if (this.form.invalid) {
      return;
    }
    this._filter = this.getFilter();
    this.filterChange.emit({...this._filter});
  }
}
