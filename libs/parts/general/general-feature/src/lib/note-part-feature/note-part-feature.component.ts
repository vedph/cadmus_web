import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThesauriSet } from '@cadmus/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditNotePartService } from './edit-note-part.service';
import { EditNotePartQuery } from './edit-note-part.query';

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
    private _editPartQuery: EditNotePartQuery,
    private _editPartService: EditNotePartService
  ) {
    this.itemId = route.snapshot.params['iid'];
    this.partId = route.snapshot.params['pid'];
    if (this.partId === 'new') {
      this.partId = null;
    }
    this.roleId = route.snapshot.params['rid'];
  }

  ngOnInit() {
    this.json$ = this._editPartQuery.selectJson(
      this.itemId,
      this.partId,
      this.roleId
    );
    this.thesauri$ = this._editPartQuery.selectThesauri();
    // load
    if (this.partId) {
      this._editPartService.load(this.partId);
    }
  }

  public onDirtyChanged(value: boolean) {
    this._editPartService.setDirty(value);
  }

  public save(json: string) {
    this._editPartService.save(json);
  }

  public close() {
    this._router.navigate(['items', this.itemId]);
  }
}
