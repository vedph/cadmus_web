import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditBibliographyPartService } from './edit-bibliography-part.service';
import { EditBibliographyPartQuery } from './edit-bibliography-part.query';
import {
  EditItemQuery,
  EditItemService,
  EditPartFeatureBase
} from '@cadmus/features/edit-state';

@Component({
  selector: 'cadmus-bibliography-part-feature',
  templateUrl: './bibliography-part-feature.component.html',
  styleUrls: ['./bibliography-part-feature.component.css']
})
export class BibliographyPartFeatureComponent extends EditPartFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    editPartQuery: EditBibliographyPartQuery,
    editPartService: EditBibliographyPartService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService
  ) {
    super(
      router,
      route,
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
    this.initEditor([
      'languages',
      'bibliography-types',
      'bibliography-author-roles'
    ]);
  }
}
