import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditNotePartService } from './edit-note-part.service';
import { EditNotePartQuery } from './edit-note-part.query';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase
} from '@cadmus/features/edit-state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cadmus-note-part-feature',
  templateUrl: './note-part-feature.component.html',
  styleUrls: ['./note-part-feature.component.css']
})
export class NotePartFeatureComponent extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditNotePartQuery,
    editPartService: EditNotePartService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService
  ) {
    super(
      router,
      route,
      snackbar,
      editPartQuery,
      editPartService,
      editItemQuery,
      editItemService
    );
    this.itemId = route.snapshot.params['iid'];
    this.partId = route.snapshot.params['pid'];
    if (this.partId === 'new') {
      this.partId = null;
    }
    this.roleId = route.snapshot.queryParams['rid'];
  }

  ngOnInit() {
    this.initEditor(['note-tags']);
  }
}
