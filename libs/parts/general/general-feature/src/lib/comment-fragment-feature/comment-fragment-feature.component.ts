import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditCommentFragmentQuery } from './edit-comment-fragment.query';
import { EditCommentFragmentService } from './edit-comment-fragment.service';
import {
  EditItemQuery,
  EditItemService,
  EditTokenLayerPartQuery,
  EditTokenLayerPartService,
  EditFragmentFeatureBase
} from '@cadmus/features/edit-state';
import { LibraryRouteService } from '@cadmus/core';

@Component({
  selector: 'cadmus-comment-fragment-feature',
  templateUrl: './comment-fragment-feature.component.html',
  styleUrls: ['./comment-fragment-feature.component.css']
})
export class CommentFragmentFeatureComponent extends EditFragmentFeatureBase
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    editFrQuery: EditCommentFragmentQuery,
    editFrService: EditCommentFragmentService,
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
    this.initEditor(['comment-tags']);
  }
}
