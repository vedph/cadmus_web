import { Component, OnInit } from '@angular/core';
import { EditPartFeatureBase, EditItemQuery, EditItemService } from '@cadmus/features/edit-state';
import { Router, ActivatedRoute } from '@angular/router';
import { EditCategoriesPartQuery } from './edit-categories-part.query';
import { EditCategoriesPartService } from './edit-categories-part.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cadmus-categories-part-feature',
  templateUrl: './categories-part-feature.component.html',
  styleUrls: ['./categories-part-feature.component.css']
})
export class CategoriesPartFeatureComponent extends EditPartFeatureBase
  implements OnInit {
    constructor(
      router: Router,
      route: ActivatedRoute,
      snackbar: MatSnackBar,
      editPartQuery: EditCategoriesPartQuery,
      editPartService: EditCategoriesPartService,
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
      this.initEditor(['categories']);
    }
  }
