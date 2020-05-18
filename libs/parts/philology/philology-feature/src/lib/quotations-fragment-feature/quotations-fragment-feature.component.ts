import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditQuotationsFragmentQuery } from './edit-quotations-fragment.query';
import { EditQuotationsFragmentService } from './edit-quotations-fragment.service';
import {
  EditItemQuery,
  EditItemService,
  EditLayerPartQuery,
  EditLayerPartService,
  EditFragmentFeatureBase,
  AppQuery,
} from '@cadmus/features/edit-state';
import { LibraryRouteService } from '@cadmus/core';

@Component({
  selector: 'cadmus-quotations-fragment-feature',
  templateUrl: './quotations-fragment-feature.component.html',
  styleUrls: ['./quotations-fragment-feature.component.css'],
})
export class QuotationsFragmentFeatureComponent extends EditFragmentFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    appQuery: AppQuery,
    editFrQuery: EditQuotationsFragmentQuery,
    editFrService: EditQuotationsFragmentService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService,
    editLayersQuery: EditLayerPartQuery,
    editLayersService: EditLayerPartService,
    libraryRouteService: LibraryRouteService
  ) {
    super(
      router,
      route,
      appQuery,
      editFrQuery,
      editFrService,
      editItemQuery,
      editItemService,
      editLayersQuery,
      editLayersService,
      libraryRouteService
    );
  }

  ngOnInit(): void {
    this.initEditor(['quotation-works', 'quotation-tags']);
  }
}
