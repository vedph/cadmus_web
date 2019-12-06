import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThesauriSet } from '@cadmus/core';
import { NotePartQuery } from './note-part.query';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cadmus-note-part-feature',
  templateUrl: './note-part-feature.component.html',
  styleUrls: ['./note-part-feature.component.css']
})
export class NotePartFeatureComponent implements OnInit {
  public json$: Observable<string>;
  public thesauri$: Observable<ThesauriSet>;

  public itemId: string;
  public partId: string;
  public roleId: string;

  constructor(
    private _router: Router,
    route: ActivatedRoute,
    private _notePartQuery: NotePartQuery
  ) {
    this.itemId = route.snapshot.params['iid'];
    this.partId = route.snapshot.params['pid'];
    if (this.partId === 'new') {
      this.partId = null;
    }
    this.roleId = route.snapshot.params['rid'];
  }

  ngOnInit() {
    this.json$ = this._notePartQuery
      .select(state => state.part)
      .pipe(
        map(p => {
          // add route-derived data
          if (p) {
            p.itemId = this.itemId;
            p.id = this.partId;
            p.roleId = this.roleId;
          }
          return JSON.stringify(p || {});
        })
      );
    this.thesauri$ = this._notePartQuery.select(state => state.thesauri);
  }

  public close() {
    // TODO: dirty check
    this._router.navigate(['items', this.itemId]);
  }
}
