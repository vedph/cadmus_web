import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { DialogService } from '@cadmus/ui';

interface Data {
  [key: string]: any;
}
interface DataKey {
  value: string;
  visible: boolean;
}

/**
 * The maximum allowed length for a datum value. This is just a reasonable
 * limit, having no other specifical reason.
 */
const VALUE_MAX_LEN = 100;

@Component({
  selector: 'cadmus-tiled-data',
  templateUrl: './tiled-data.component.html',
  styleUrls: ['./tiled-data.component.css']
})
export class TiledDataComponent implements OnInit {
  private _data: Data;
  public keys: DataKey[];

  @Input()
  public title: string;

  @Input()
  public get data(): Data {
    return this._data;
  }
  public set data(value: Data) {
    this._data = value;
    this.updateForm();
  }

  @Output()
  public dataChange: EventEmitter<Data>;

  @Output()
  public cancel: EventEmitter<any>;

  public keyFilter: FormControl;
  public filterForm: FormGroup;

  public newKey: FormControl;
  public newValue: FormControl;
  public newForm: FormGroup;

  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _dialogService: DialogService) {
    // filter form
    this.keyFilter = _formBuilder.control(null);
    this.filterForm = _formBuilder.group({
      keyFilter: this.keyFilter
    });
    // new datum form
    this.newKey = _formBuilder.control(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z_$][[a-zA-Z_$0-9]{0,49}$')
    ]);
    this.newValue = _formBuilder.control(null, [
      Validators.maxLength(VALUE_MAX_LEN)
    ]);
    this.newForm = _formBuilder.group({
      newKey: this.newKey,
      newValue: this.newValue
    });
    // editing form (controls are dynamically populated)
    this.form = _formBuilder.group({});
    // events
    this.dataChange = new EventEmitter<Data>();
    this.cancel = new EventEmitter<any>();
  }

  ngOnInit() {
    this.keyFilter.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe(_ => {
        this.updateDataVisibility();
      });
  }

  private matchesFilter(key: string) {
    if (!this.keyFilter.value) {
      return true;
    }
    const filter = this.keyFilter.value.toLowerCase();
    return key.toLowerCase().indexOf(filter) > -1;
  }

  public isVisibleKey(key: string) {
    const dataKey = this.keys.find(k => {
      return k.value === key;
    });
    return dataKey ? dataKey.visible : false;
  }

  private updateForm() {
    // reset
    this.keys = [];
    this.form = this._formBuilder.group({});

    if (!this._data) {
      return;
    }

    // collect keys from data's own properties and sort the result
    const cache: DataKey[] = [];
    Object.getOwnPropertyNames(this._data).forEach((key: string) => {
      cache.push({ value: key, visible: this.matchesFilter(key) });
    });
    cache.sort();

    // add a control for each collected key
    for (let i = 0; i < cache.length; i++) {
      const key = cache[i];
      this.form.addControl(
        key.value,
        this._formBuilder.control(
          this._data[key.value],
          Validators.maxLength(VALUE_MAX_LEN)
        )
      );
    }
    this.keys = cache;
  }

  private updateDataVisibility() {
    for (let i = 0; i < this.keys.length; i++) {
      this.keys[i] = {
        value: this.keys[i].value,
        visible: this.matchesFilter(this.keys[i].value)
      };
    }
  }

  private getData(): Data {
    const data: Data = {};
    for (let i = 0; i < this.keys.length; i++) {
      const keyValue = this.keys[i].value;
      data[keyValue] = this.form.controls[keyValue].value;
    }
    return data;
  }

  public deleteDatum(key: string) {
    this._dialogService
    .confirm('Confirm Deletion', `Delete datum #"${key}"?`)
    .subscribe((ok: boolean) => {
      if (!ok) {
        return;
      }
      delete this._data[key];
      this.updateForm();
    });
  }

  public addDatum() {
    if (this.newForm.invalid) {
      return;
    }
    this._data[this.newKey.value] = this.newValue.value;
    this.newForm.reset();
    this.updateForm();
  }

  public close() {
    this.cancel.emit();
  }

  public save() {
    if (this.form.invalid) {
      return;
    }
    this._data = this.getData();
    this.dataChange.emit(this._data);
  }
}
