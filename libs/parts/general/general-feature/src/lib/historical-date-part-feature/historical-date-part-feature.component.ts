import { Component, OnInit } from '@angular/core';
import { EditPartFeatureBase, EditItemQuery, EditItemService } from '@cadmus/features/edit-state';
import { Router, ActivatedRoute } from '@angular/router';
import { EditHistoricalDatePartQuery } from './edit-historical-date-part.query';
import { EditHistoricalDatePartService } from './edit-historical-date-part.service';

@Component({
  selector: 'cadmus-historical-date-part-feature',
  templateUrl: './historical-date-part-feature.component.html',
  styleUrls: ['./historical-date-part-feature.component.css']
})
export class HistoricalDatePartFeatureComponent extends EditPartFeatureBase
  implements OnInit {

    constructor(
      router: Router,
      route: ActivatedRoute,
      editPartQuery: EditHistoricalDatePartQuery,
      editPartService: EditHistoricalDatePartService,
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
      this.initEditor(null);
    }
  }
