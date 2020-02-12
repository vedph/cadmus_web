import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditWitnessesFragmentQuery } from './edit-witnesses-fragment.query';
import { EditWitnessesFragmentService } from './edit-witnesses-fragment.service';
import {
  EditItemQuery,
  EditItemService,
  EditLayerPartQuery,
  EditLayerPartService,
  EditFragmentFeatureBase,
  AppQuery
} from '@cadmus/features/edit-state';
import { LibraryRouteService } from '@cadmus/core';

@Component({
  selector: 'cadmus-witnesses-fragment-feature',
  templateUrl: './witnesses-fragment-feature.component.html',
  styleUrls: ['./witnesses-fragment-feature.component.css']
})
export class WitnessesFragmentFeatureComponent extends EditFragmentFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    appQuery: AppQuery,
    editFrQuery: EditWitnessesFragmentQuery,
    editFrService: EditWitnessesFragmentService,
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

  ngOnInit() {
    this.initEditor(null);
  }
}
