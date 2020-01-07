import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Credentials } from '@cadmus/ui';
import { AuthQuery } from '../state/auth.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'cadmus-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public validating$: Observable<boolean>;
  public error$: Observable<string>;

  constructor(
    private _authQuery: AuthQuery,
    private _loginService: LoginService
  ) {}

  ngOnInit() {
    this.validating$ = this._authQuery.validating$;
    this.error$ = this._authQuery.error$;
  }

  public onSubmit(credentials: Credentials) {
    this._loginService.login(
      credentials.name,
      credentials.password,
      credentials.returnUrl
    );
  }
}
