import { Component, OnInit } from '@angular/core';
import { OrthographyFragment } from '@cadmus/parts/philology/philology-ui';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public partJson: string;
  public thesauriJson: string;

  constructor() {
  }

  ngOnInit() {
  }
}
