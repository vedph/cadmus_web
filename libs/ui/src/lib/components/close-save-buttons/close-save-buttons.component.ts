import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cadmus-close-save-buttons',
  templateUrl: './close-save-buttons.component.html',
  styleUrls: ['./close-save-buttons.component.css']
})
export class CloseSaveButtonsComponent implements OnInit {
  @Input()
  public form: FormGroup;

  @Output()
  public closeRequest: EventEmitter<any>;

  constructor() {
    this.closeRequest = new EventEmitter();
  }

  ngOnInit() {}

  public close() {
    this.closeRequest.emit();
  }
}
