import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
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
export class ItemQueryComponent implements OnInit, AfterViewInit {
  private _lastQueries: string[];

  public form: FormGroup;
  public query: FormControl;
  public history: FormControl;

  @ViewChild('queryctl', { static: false })
  public queryElement?: ElementRef<HTMLElement>;

  /**
   * Emitted when the query is submitted.
   */
  @Output()
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

  ngOnInit(): void {}

  private focusQuery() {
    if (this.queryElement) {
      setTimeout(() => {
        this.queryElement.nativeElement.focus();
      }, 500);
    }
  }

  ngAfterViewInit(): void {
    this.focusQuery();
  }

  public setQuery(query: string) {
    this.query.setValue(query);
    this.focusQuery();
  }

  public submitQuery() {
    if (this.form.invalid) {
      return;
    }
    this.querySubmit.emit(this.query.value);
  }
}
