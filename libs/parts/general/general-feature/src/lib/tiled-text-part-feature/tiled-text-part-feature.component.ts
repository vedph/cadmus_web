import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditTiledTextPartService } from './edit-tiled-text-part.service';
import { EditTiledTextPartQuery } from './edit-tiled-text-part.query';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase
} from '@cadmus/features/edit-state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cadmus-tiled-text-part-feature',
  templateUrl: './tiled-text-part-feature.component.html',
  styleUrls: ['./tiled-text-part-feature.component.css']
})
export class TiledTextPartFeatureComponent extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    editPartQuery: EditTiledTextPartQuery,
    editPartService: EditTiledTextPartService,
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
    this.initEditor(null);
  }
}
