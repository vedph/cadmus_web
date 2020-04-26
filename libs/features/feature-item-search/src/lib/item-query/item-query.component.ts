import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'cadmus-item-query',
  templateUrl: './item-query.component.html',
  styleUrls: ['./item-query.component.css']
})
export class ItemQueryComponent implements OnInit {
  private _lastQueries: string[];

  public form: FormGroup;
  public query: FormControl;
  public history: FormControl;

  /**
   * Emitted when the query is submitted.
   */
  public querySubmit: EventEmitter<string>;

  @Input()
  public get lastQueries(): string[] {
    return this._lastQueries;
  }
  public set lastQueries(value: string[]) {
    this._lastQueries = value || [];
    this.history.setValue(this._lastQueries);
  }

  @Input() public disabled: boolean;

  constructor(formBuilder: FormBuilder) {
    // events
    this.querySubmit = new EventEmitter<string>();
    // form
    this.query = formBuilder.control(null, Validators.required);
    this.history = formBuilder.control(null);
    this.form = formBuilder.group({
      query: this.query,
      history: this.history
    });
  }

  ngOnInit(): void {
    this.history.valueChanges.subscribe(_ => {
      if (this.history.value) {
        this.setQuery(this.history.value);
      }
    });
  }

  public setQuery(query: string) {
    this.query.setValue(query);
  }

  public submitQuery() {
    if (this.form.invalid) {
      return;
    }
    this.querySubmit.emit(this.query.value);
  }
}
