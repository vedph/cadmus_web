import { Component, OnInit } from '@angular/core';
import {
  EditPartFeatureBase,
  EditItemQuery,
  EditItemService
} from '@cadmus/features/edit-state';
import { Router, ActivatedRoute } from '@angular/router';
import { EditIndexKeywordsPartQuery } from './edit-index-keywords-part.query';
import { EditIndexKeywordsPartService } from './edit-index-keywords-part.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cadmus-index-keywords-part-feature',
  templateUrl: './index-keywords-part-feature.component.html',
  styleUrls: ['./index-keywords-part-feature.component.css']
})
export class IndexKeywordsPartFeatureComponent extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditIndexKeywordsPartQuery,
    editPartService: EditIndexKeywordsPartService,
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
  }

  ngOnInit() {
    this.initEditor(['languages', 'index-keywords']);
  }
}
