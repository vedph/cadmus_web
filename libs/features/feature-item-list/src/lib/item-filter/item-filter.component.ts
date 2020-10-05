import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ItemFilter } from '@cadmus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemsLookupService } from '../services/items-lookup.service';
import { ItemsLookupQuery } from '../state/items-lookup.query';
import { ItemsLookupState } from '../state/items-lookup.store';

/**
 * Items filter.
 */
@Component({
  selector: 'cadmus-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.css']
})
export class ItemFilterComponent implements OnInit {
  @Input()
  public filter$: BehaviorSubject<ItemFilter>;

  public title: FormControl;
  public description: FormControl;
  public facet: FormControl;
  public group: FormControl;
  public flags: FormControl;
  public minModified: FormControl;
  public maxModified: FormControl;
  public user: FormControl;
  public form: FormGroup;

  public lookup$: Observable<ItemsLookupState>;

  constructor(
    private _itemsLookupService: ItemsLookupService,
    private _itemsLookupQuery: ItemsLookupQuery,
    formBuilder: FormBuilder) {
    this.title = formBuilder.control(null);
    this.description = formBuilder.control(null);
    this.facet = formBuilder.control(null);
    this.group = formBuilder.control(null);
    this.flags = formBuilder.control(null);
    this.minModified = formBuilder.control(null);
    this.maxModified = formBuilder.control(null);
    this.user = formBuilder.control(null);

    this.form = formBuilder.group({
      title: this.title,
      description: this.description,
      facet: this.facet,
      group: this.group,
      flags: this.flags,
      minModified: this.minModified,
      maxModified: this.maxModified,
      user: this.user
    });
  }

  ngOnInit() {
    // subscribe to lookup data
    this.lookup$ = this._itemsLookupQuery.select();

    // update form when filter changes
    this.filter$.subscribe(f => {
      this.updateForm(f);
    })

    // lookup
    this._itemsLookupService.load();
  }

  private updateForm(filter: ItemFilter) {
    this.title.setValue(filter.title);
    this.description.setValue(filter.description);
    this.facet.setValue(filter.facetId);
    this.group.setValue(filter.groupId);
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
      facetId: this.facet.value,
      groupId: this.group.value,
      flags: 0, // this.getFlagsValue(),
      userId: this.user.value ? this.user.value.userName : null,
      minModified: this.minModified.value ? this.minModified.value : null,
      maxModified: this.maxModified.value ? this.maxModified.value : null
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
