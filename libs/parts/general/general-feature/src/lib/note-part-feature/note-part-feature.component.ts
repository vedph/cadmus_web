import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThesauriSet } from '@cadmus/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditNotePartQuery } from './edit-note-part.query';
import { EditPartService } from '@cadmus/features/edit-state';

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
    private _partQuery: EditNotePartQuery,
    private _editPartService: EditPartService
  ) {
    this.itemId = route.snapshot.params['iid'];
    this.partId = route.snapshot.params['pid'];
    if (this.partId === 'new') {
      this.partId = null;
    }
    this.roleId = route.snapshot.params['rid'];
  }

  ngOnInit() {
    //@@
    this._partQuery.select().subscribe(s => {
      console.log(s);
    })

    this.json$ = this._partQuery.selectJson(
      this.itemId,
      this.partId,
      this.roleId
    );
    this.thesauri$ = this._partQuery.selectThesauri();
    // load
    if (this.partId) {
      this._editPartService.load(this.partId);
    }
  }

  public onDirtyChanged(value: boolean) {
    this._editPartService.setDirty(value);
  }

  public close() {
    this._router.navigate(['items', this.itemId]);
  }
}
