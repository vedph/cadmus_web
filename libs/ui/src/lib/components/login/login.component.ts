import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

export interface Credentials {
  name: string;
  password: string;
  returnUrl?: string;
}

@Component({
  selector: 'cadmus-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _returnUrl: string;

  @Input()
  public set validating(value: boolean) {
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

  constructor(formBuilder: FormBuilder, route: ActivatedRoute) {
    // events
    this.submitted = new EventEmitter<Credentials>();
    // form
    this.name = formBuilder.control(null, Validators.required);
    this.password = formBuilder.control(null, Validators.required);
    this.form = formBuilder.group({
      name: this.name,
      password: this.password
    });

    // get return URL if any
    this._returnUrl = route.snapshot.queryParams['returnUrl'];
  }

  ngOnInit() {}

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted.emit({
      name: this.name.value,
      password: this.password.value,
      returnUrl: this._returnUrl
    });
  }
}
