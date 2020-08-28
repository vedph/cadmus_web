import { Component, OnInit } from '@angular/core';
import { EditPartFeatureBase, EditItemQuery, EditItemService } from '@cadmus/features/edit-state';
import { Router, ActivatedRoute } from '@angular/router';
import { EditKeywordsPartQuery } from './edit-keywords-part.query';
import { EditKeywordsPartService } from './edit-keywords-part.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cadmus-keywords-part-feature',
  templateUrl: './keywords-part-feature.component.html',
  styleUrls: ['./keywords-part-feature.component.css']
})
export class KeywordsPartFeatureComponent extends EditPartFeatureBase
implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditKeywordsPartQuery,
    editPartService: EditKeywordsPartService,
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
    this.initEditor(['languages']);
  }
}
