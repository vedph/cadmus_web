import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

interface Data {
  [key: string]: any;
}
interface DataKey {
  value: string;
  visible: boolean;
}

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
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    // form
    this.keyFilter = _formBuilder.control(null);
    this.form = _formBuilder.group({});
    // events
    this.dataChange = new EventEmitter<Data>();
    this.cancel = new EventEmitter<any>();
  }

  ngOnInit() {
    this.keyFilter.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300)
    ).subscribe(_ => {
      this.updateDataVisibility();
    })
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
    return dataKey? dataKey.visible : false;
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
        this._formBuilder.control(this._data[key.value])
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

  public close() {
    this.cancel.emit();
  }

  public save() {
    // TODO:
  }
}
