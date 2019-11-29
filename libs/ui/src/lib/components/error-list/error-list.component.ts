import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cadmus-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent implements OnInit {
  @Input()
  public errors: string[];

  constructor() { }

  ngOnInit() {
  }
}
