import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditOrthographyFragmentQuery } from './edit-orthography-fragment.query';
import { EditOrthographyFragmentService } from './edit-orthography-fragment.service';
import {
  EditItemQuery,
  EditItemService,
  EditLayerPartQuery,
  EditLayerPartService,
  EditFragmentFeatureBase
} from '@cadmus/features/edit-state';
import { LibraryRouteService } from '@cadmus/core';

@Component({
  selector: 'cadmus-orthography-fragment-feature',
  templateUrl: './orthography-fragment-feature.component.html',
  styleUrls: ['./orthography-fragment-feature.component.css']
})
export class OrthographyFragmentFeatureComponent extends EditFragmentFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    editFrQuery: EditOrthographyFragmentQuery,
    editFrService: EditOrthographyFragmentService,
    editItemQuery: EditItemQuery,
    editItemService: EditItemService,
    editLayersQuery: EditLayerPartQuery,
    editLayersService: EditLayerPartService,
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
    this.initEditor(null);
  }
}
