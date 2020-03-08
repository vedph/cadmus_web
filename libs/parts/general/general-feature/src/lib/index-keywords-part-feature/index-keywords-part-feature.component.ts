import { Component, OnInit } from '@angular/core';
import {
  EditPartFeatureBase,
  EditItemQuery,
  EditItemService
} from '@cadmus/features/edit-state';
import { Router, ActivatedRoute } from '@angular/router';
import { EditIndexKeywordsPartQuery } from './edit-index-keywords-part.query';
import { EditIndexKeywordsPartService } from './edit-index-keywords-part.service';

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
    editPartQuery: EditIndexKeywordsPartQuery,
    editPartService: EditIndexKeywordsPartService,
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
    this.initEditor(['languages', 'index-keywords']);
  }
}
