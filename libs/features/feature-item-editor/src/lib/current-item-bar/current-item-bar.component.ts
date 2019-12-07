import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '@cadmus/core';
import { EditItemQuery } from '@cadmus/features/edit-state';

@Component({
  selector: 'cadmus-current-item-bar',
  templateUrl: './current-item-bar.component.html',
  styleUrls: ['./current-item-bar.component.css']
})
export class CurrentItemBarComponent implements OnInit {
  public item$: Observable<Item>;

  constructor(
    private _query: EditItemQuery
  ) {}

  ngOnInit() {
    this.item$ = this._query.select(state => state.item);
  }
}
