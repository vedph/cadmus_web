import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { GeneralUiModule, NOTE_PART_TYPEID, COMMENT_FRAGMENT_TYPEID, KEYWORDS_PART_TYPEID } from '@cadmus/parts/general/general-ui';
import { EditStateModule } from '@cadmus/features/edit-state';

import { NotePartFeatureComponent } from './note-part-feature/note-part-feature.component';
import { FeaturesUiModule } from '@cadmus/features/features-ui';
import { CommentFragmentFeatureComponent } from './comment-fragment-feature/comment-fragment-feature.component';
import { TokenTextPartFeatureComponent } from './token-text-part-feature/token-text-part-feature.component';
import { CategoriesPartFeatureComponent } from './categories-part-feature/categories-part-feature.component';
import { CATEGORIES_PART_TYPEID, CHRONOLOGY_FRAGMENT_TYPEID } from '@cadmus/parts/general/general-ui';
import { KeywordsPartFeatureComponent } from './keywords-part-feature/keywords-part-feature.component';
import { ChronologyFragmentFeatureComponent } from './chronology-fragment-feature/chronology-fragment-feature.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: `${CATEGORIES_PART_TYPEID}/:pid`,
        pathMatch: 'full',
        component: CategoriesPartFeatureComponent
      },
      {
        path: `${KEYWORDS_PART_TYPEID}/:pid`,
        pathMatch: 'full',
        component: KeywordsPartFeatureComponent
      },
      {
        path: `${NOTE_PART_TYPEID}/:pid`,
        pathMatch: 'full',
        component: NotePartFeatureComponent
      },
      {
        path: `fragment/:pid/${COMMENT_FRAGMENT_TYPEID}/:loc`,
        pathMatch: 'full',
        component: CommentFragmentFeatureComponent
      },
      {
        path: `fragment/:pid/${CHRONOLOGY_FRAGMENT_TYPEID}/:loc`,
        pathMatch: 'full',
        component: ChronologyFragmentFeatureComponent
      }
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    UiModule,
    GeneralUiModule,
    EditStateModule,
    FeaturesUiModule
  ],
  declarations: [
    CategoriesPartFeatureComponent,
    ChronologyFragmentFeatureComponent,
    CommentFragmentFeatureComponent,
    KeywordsPartFeatureComponent,
    NotePartFeatureComponent,
    TokenTextPartFeatureComponent
  ],
  exports: [
    CategoriesPartFeatureComponent,
    ChronologyFragmentFeatureComponent,
    CommentFragmentFeatureComponent,
    KeywordsPartFeatureComponent,
    NotePartFeatureComponent,
    TokenTextPartFeatureComponent
  ]
})
export class GeneralFeatureModule {}
