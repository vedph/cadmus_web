import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@cadmus/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AuthService } from '@cadmus/api';

@Component({
  selector: 'cadmus-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {
  private _user: User;

  public email: FormControl;
  public emailConfirmed: FormControl;
  public lockoutEnabled: FormControl;
  public firstName: FormControl;
  public lastName: FormControl;
  public roles: FormControl;
  public form: FormGroup;

  public unlocked: boolean;

  @Input() public set user(value: User) {
    if (this._user === value) {
      return;
    }
    this._user = value;
    this.updateForm(value);
  }
  public get user(): User {
    return this._user;
  }

  @Output() userChange: EventEmitter<User>;
  @Output() editorClose: EventEmitter<any>;

  constructor(formBuilder: FormBuilder, private _authService: AuthService) {
    // events
    this.userChange = new EventEmitter<User>();
    this.editorClose = new EventEmitter<any>();
    // form
    this.email = formBuilder.control(null, [
      Validators.required,
      Validators.email
    ]);

    this.emailConfirmed = formBuilder.control(false);
    this.lockoutEnabled = formBuilder.control(false);

    this.firstName = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50)
    ]);

    this.lastName = formBuilder.control(null, [
      Validators.required,
      Validators.maxLength(50)
    ]);

    this.roles = formBuilder.control(null, Validators.maxLength(200));

    this.form = formBuilder.group({
      email: this.email,
      emailConfirmed: this.emailConfirmed,
      lockoutEnabled: this.lockoutEnabled,
      firstName: this.firstName,
      lastName: this.lastName,
      roles: this.roles
    });
  }

  ngOnInit() {}

  private updateForm(user: User) {
    if (!user) {
      this.form.reset();
    } else {
      this.email.setValue(user.email);
      this.emailConfirmed.setValue(user.emailConfirmed);
      this.lockoutEnabled.setValue(user.lockoutEnabled);
      this.firstName.setValue(user.firstName);
      this.lastName.setValue(user.lastName);
      if (user.roles.length > 0) {
        this.roles.setValue(user.roles.join(' '));
      } else {
        this.roles.setValue(null);
      }
    }
  }

  private getUserFromForm(): User {
    return {
      userName: this._user.userName,
      email: this.email.value,
      emailConfirmed: this.emailConfirmed.value,
      lockoutEnabled: this.lockoutEnabled.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      roles: this.roles.value.split(' ').filter((s: string) => (s))
    };
  }

  public endLockout() {
    if (this.unlocked) {
      return;
    }
    this._user.lockoutEnd = this._authService.getUTCDate();
    this.unlocked = true;
  }

  public close() {
    this.editorClose.emit();
  }

  public save() {
    if (this.form.invalid) {
      return;
    }
    this.userChange.emit(this.getUserFromForm());
  }
}
