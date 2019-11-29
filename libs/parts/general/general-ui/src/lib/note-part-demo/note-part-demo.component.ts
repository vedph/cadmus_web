import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cadmus-note-part-demo',
  templateUrl: './note-part-demo.component.html',
  styleUrls: ['./note-part-demo.component.css']
})
export class NotePartDemoComponent implements OnInit {
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
