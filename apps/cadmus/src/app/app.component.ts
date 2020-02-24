import { Component, OnInit } from '@angular/core';
import { User, GravatarService } from '@cadmus/core';
import { AuthService } from '@cadmus/api';
import { AppService } from '@cadmus/features/edit-state';

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
    private _gravatarService: GravatarService,
    private _appService: AppService
  ) {}

  ngOnInit() {
    this.user = this._authService.currentUserValue;
    this.logged = this.user !== null;

    this._authService.currentUser$.subscribe((user: User) => {
      this.logged = this._authService.isAuthenticated(true);
      this.user = user;
      // load the general app state just once
      if (user) {
        this._appService.load();
      }
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
