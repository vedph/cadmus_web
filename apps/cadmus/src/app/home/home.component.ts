import { Component } from '@angular/core';
import { EnvService } from '@cadmus/core';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public title: string;

  constructor(env: EnvService) {
    this.title = env.name;
  }
}
