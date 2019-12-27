import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditApparatusFragmentQuery } from './edit-apparatus-fragment.query';
import { EditApparatusFragmentService } from './edit-apparatus-fragment.service';
import {
  EditItemQuery,
  EditItemService,
  EditTokenLayerPartQuery,
  EditTokenLayerPartService,
  EditFragmentFeatureBase
} from '@cadmus/features/edit-state';

@Component({
  selector: 'cadmus-apparatus-fragment-feature',
  templateUrl: './apparatus-fragment-feature.component.html',
  styleUrls: ['./apparatus-fragment-feature.component.css']
})
export class ApparatusFragmentFeatureComponent extends EditFragmentFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    editFrQuery: EditApparatusFragmentQuery,
    editFrService: EditApparatusFragmentService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService,
    editLayersQuery: EditTokenLayerPartQuery,
    editLayersService: EditTokenLayerPartService
  ) {
    super(
      router,
      route,
      editFrQuery,
      editFrService,
      editItemQuery,
      editItemService,
      editLayersQuery,
      editLayersService
    );
  }

  ngOnInit() {
    this.initEditor(null);
  }
}
