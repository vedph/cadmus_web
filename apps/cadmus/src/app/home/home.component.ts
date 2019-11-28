import { Component, OnInit } from '@angular/core';
import { OrthographyFragment } from '@cadmus/parts/philology/philology-ui';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currentTabIndex: number;
  public partJson: string;
  public thesauriJson: string;

  constructor() {
    this.currentTabIndex = 0;
  }

  ngOnInit() {
  }

  public onCodeSaved() {
    this.currentTabIndex = 1;
  }

  public onEditorSaved() {
    this.currentTabIndex = 0;
  }
}
