import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '@cadmus/api';
import { ExistResult } from '@cadmus/core';

@Component({
  selector: 'cadmus-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {
  public busy: boolean;
  // form
  public registration: FormGroup;
  public email: FormControl;
  public name: FormControl;
  public firstName: FormControl;
  public lastName: FormControl;
  public passwords: FormGroup;
  public password: FormControl;
  public confirmPassword: FormControl;

  constructor(
    formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private _authService: AuthService
  ) {
    this.email = formBuilder.control(
      '',
      [Validators.required, Validators.email],
      this.createUniqueEmailValidator(this._authService).bind(this)
    );

    this.name = formBuilder.control(
      '',
      Validators.required,
      this.createUniqueNameValidator(this._authService).bind(this)
    );

    this.firstName = formBuilder.control('', [
      Validators.required,
      Validators.maxLength(50)
    ]);
    this.lastName = formBuilder.control('', [
      Validators.required,
      Validators.maxLength(50)
    ]);

    // http://stackoverflow.com/questions/35474991/angular-2-form-validating-for-repeat-password
    this.password = formBuilder.control(
      '',
      Validators.compose([
        Validators.required,
        PasswordValidator.isValidPassword
      ])
    );
    this.confirmPassword = formBuilder.control('', Validators.required);
    this.passwords = formBuilder.group(
      {
        password: this.password,
        confirmPassword: this.confirmPassword
      },
      { validator: this.areEqual.bind(this) }
    );

    this.registration = formBuilder.group({
      email: this.email,
      name: this.name,
      firstName: this.firstName,
      lastName: this.lastName,
      passwords: this.passwords
    });
  }

  private areEqual(group: FormGroup): IValidationResult {
    if (this.password.value === this.confirmPassword.value) {
      return null;
    }
    return {
      areEqual: true
    };
  }

  /**
   * Creates a unique name validator. There is no dependency injection at this level,
   * but we can use closures. As a matter of fact, we have access to the service instance
   * from the component where we register validators. So we will implement a function
   * that will accept the service as parameter, and create the actual validation function.
   * This function will have access to the service when called during the validation process.
   * See http://restlet.com/blog/2016/02/17/implementing-angular2-forms-beyond-basics-part-2/.
   */
  private createUniqueNameValidator(service: AuthService) {
    return function(control) {
      return new Promise((resolve, reject) => {
        // avoid checking if empty
        if (!control.value) {
          resolve(null);
        } else {
          service.isNameRegistered(control.value).subscribe(
            (data: ExistResult) => {
              if (!data.isExisting) {
                resolve(null);
              } else {
                resolve({ uniqueName: true });
              }
            },
            err => {
              resolve({ uniqueName: true });
            }
          );
        }
      });
    };
  }

  private createUniqueEmailValidator(service: AuthService) {
    return function(control) {
      return new Promise((resolve, reject) => {
        // avoid checking if empty
        if (!control.value) {
          resolve(null);
        } else {
          service.isEmailRegistered(control.value).subscribe(
            (data: ExistResult) => {
              if (!data.isExisting) {
                resolve(null);
              } else {
                resolve({ uniqueEmail: true });
              }
            },
            err => {
              resolve({ uniqueEmail: true });
            }
          );
        }
      });
    };
  }

  ngOnInit() {}
}
