import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '@cadmus/api';

@Component({
  selector: 'cadmus-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public busy: boolean;
  public form: FormGroup;
  public email: FormControl;

  constructor(
    private _snackbar: MatSnackBar,
    private _accountService: AccountService,
    formBuilder: FormBuilder
  ) {
    this.email = formBuilder.control(null, [
      Validators.required,
      Validators.email
    ]);
    this.form = formBuilder.group({
      email: this.email
    });
  }

  ngOnInit() {}

  public reset() {
    if (this.busy) {
      return;
    }

    this.busy = true;
    this._accountService.resetPassword(this.email.value).subscribe(
      () => {
        this.busy = false;
        this._snackbar.open(`Message sent to ${this.email.value}`, 'OK');
      },
      error => {
        this.busy = false;
        console.error(error);
        this._snackbar.open(
          `Error sending message to ${this.email.value}`,
          'OK'
        );
      }
    );
  }
}
