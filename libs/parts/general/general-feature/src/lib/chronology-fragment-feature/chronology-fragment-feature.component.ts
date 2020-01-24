import { Component, OnInit } from '@angular/core';
import {
  EditItemQuery,
  EditItemService,
  EditTokenLayerPartQuery,
  EditTokenLayerPartService,
  EditFragmentFeatureBase
} from '@cadmus/features/edit-state';
import { Router, ActivatedRoute } from '@angular/router';
import { EditChronologyFragmentQuery } from './edit-chronology-fragment.query';
import { EditChronologyFragmentService } from './edit-chronology-fragment.service';
import { LibraryRouteService } from '@cadmus/core';

@Component({
  selector: 'cadmus-chronology-fragment-feature',
  templateUrl: './chronology-fragment-feature.component.html',
  styleUrls: ['./chronology-fragment-feature.component.css']
})
export class ChronologyFragmentFeatureComponent extends EditFragmentFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    editFrQuery: EditChronologyFragmentQuery,
    editFrService: EditChronologyFragmentService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService,
    editLayersQuery: EditTokenLayerPartQuery,
    editLayersService: EditTokenLayerPartService,
    libraryRouteService: LibraryRouteService
  ) {
    super(
      router,
      route,
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
    this.initEditor(['chronology-tags']);
  }
}
