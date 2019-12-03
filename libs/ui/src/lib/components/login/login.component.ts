import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

export interface Credentials {
  name: string;
  password: string;
}

@Component({
  selector: 'cadmus-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input()
  public set disabled(value: boolean) {
    if (value) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input()
  public errorMessage: string | null;

  @Output()
  public submitted: EventEmitter<Credentials>;

  public name: FormControl;
  public password: FormControl;
  public form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    // events
    this.submitted = new EventEmitter<Credentials>();
    // form
    this.name = formBuilder.control(null, Validators.required);
    this.password = formBuilder.control(null, Validators.required);
  }

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit({
        name: this.name.value,
        password: this.password.value
      });
    }
  }
}
