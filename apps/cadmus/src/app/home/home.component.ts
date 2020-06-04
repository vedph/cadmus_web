import { Component } from '@angular/core';
import { EnvService } from '@cadmus/core';
import { AuthService } from '@cadmus/api';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public title: string;
  public logged: boolean;

  constructor(env: EnvService, authService: AuthService) {
    this.title = env.name;
    this.logged = authService.currentUserValue !== null;
  }
}
