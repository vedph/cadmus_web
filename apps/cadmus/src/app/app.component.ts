import { Component, OnInit } from '@angular/core';
import {
  User,
  GravatarService
} from '@cadmus/core';
import { AuthService } from '@cadmus/api';

@Component({
  selector: 'cadmus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public user: User;
  public logged: boolean;

  constructor(
    private _authService: AuthService,
    private _gravatarService: GravatarService
  ) {}

  ngOnInit() {
    this.user = this._authService.currentUserValue;
    this.logged = this.user !== null;

    this._authService.currentUser$.subscribe((user: User) => {
      this.logged = this._authService.isAuthenticated(true);
      this.user = user;
    });
  }

  public getGravatarUrl(email: string, size = 80) {
    return this._gravatarService.buildGravatarUrl(email, size);
  }

  public logout() {
    if (!this.logged) {
      return;
    }
    this._authService.logout();
  }
}
