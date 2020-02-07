import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '@cadmus/api';
import { PasswordValidator } from '@cadmus/core';

@Component({
  selector: 'cadmus-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public busy: boolean;

  public email: FormControl;
  public oldPassword: FormControl;
  public newPassword: FormControl;
  public confirmPassword: FormControl;
  public passwords: FormGroup;
  public form: FormGroup;

  constructor(
    private _snackbar: MatSnackBar,
    private _accountService: AccountService,
    formBuilder: FormBuilder
  ) {
    // form
    this.email = formBuilder.control(null, [
      Validators.required,
      Validators.email
    ]);

    // http://stackoverflow.com/questions/35474991/angular-2-form-validating-for-repeat-password
    this.oldPassword = formBuilder.control(null, [
      Validators.required,
      PasswordValidator.isValidPassword
    ]);
    this.newPassword = formBuilder.control(null, Validators.required);
    this.confirmPassword = formBuilder.control(null, Validators.required);

    this.passwords = formBuilder.group(
      {
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
      },
      { validator: this.areEqual.bind(this) }
    );

    this.form = formBuilder.group({
      email: this.email,
      oldPassword: this.oldPassword,
      passwords: this.passwords
    });
  }

  private areEqual(group: FormGroup): { [key: string]: boolean } {
    if (this.oldPassword.value === this.confirmPassword.value) {
      return null;
    }
    return {
      areEqual: true
    };
  }

  ngOnInit() {}

  public getPasswordErrorLabel(): string {
    if (!this.newPassword.dirty) {
      return null;
    }

    if (this.newPassword.hasError('required')) {
      return 'password required';
    }
    if (this.newPassword.hasError('passwordTooShort')) {
      let s = 'at least 8 characters';
      if (this.newPassword.value) {
        s += ` (now ${this.newPassword.value.length})`;
      }
      return s;
    }
    if (this.newPassword.hasError('noUpperInPassword')) {
      return 'at least 1 lowercase letter';
    }
    if (this.newPassword.hasError('noLowerInPassword')) {
      return 'at least 1 uppercase letter';
    }
    if (this.newPassword.hasError('noSymbolInPassword')) {
      return 'at least 1 punctuation or symbol';
    }

    return null;
  }

  public change() {
    if (this.busy || !this.form.valid) {
      return;
    }

    this.busy = true;
    this._accountService
      .changePassword({
        email: this.email.value,
        oldPassword: this.oldPassword.value,
        newPassword: this.newPassword.value,
        confirmPassword: this.confirmPassword.value
      })
      .subscribe(
        () => {
          this.busy = false;
          this._snackbar.open('Password changed', 'OK');
        },
        error => {
          this.busy = false;
          console.error(error);
          this._snackbar.open(`Error changing password`, 'OK');
        }
      );
  }
}
