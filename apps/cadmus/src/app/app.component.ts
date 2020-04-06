import { Component, OnInit } from '@angular/core';
import { User, GravatarService, Thesaurus } from '@cadmus/core';
import { AuthService } from '@cadmus/api';
import { AppService, AppQuery } from '@cadmus/features/edit-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'cadmus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public user: User;
  public logged: boolean;
  public itemBrowserThesaurus$: Observable<Thesaurus>;

  constructor(
    private _authService: AuthService,
    private _gravatarService: GravatarService,
    private _appService: AppService,
    appQuery: AppQuery
  ) {
    this.itemBrowserThesaurus$ = appQuery.selectItemBrowserThesaurus();
  }

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
