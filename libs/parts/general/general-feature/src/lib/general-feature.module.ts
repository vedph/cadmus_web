import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule, PendingChangesGuard } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import {
  GeneralUiModule,
  NOTE_PART_TYPEID,
  COMMENT_FRAGMENT_TYPEID,
  KEYWORDS_PART_TYPEID,
  TOKEN_TEXT_PART_TYPEID,
  HISTORICAL_DATE_PART_TYPEID
} from '@cadmus/parts/general/general-ui';
import { EditStateModule } from '@cadmus/features/edit-state';

import { NotePartFeatureComponent } from './note-part-feature/note-part-feature.component';
import { FeaturesUiModule } from '@cadmus/features/features-ui';
import { CommentFragmentFeatureComponent } from './comment-fragment-feature/comment-fragment-feature.component';
import { TokenTextPartFeatureComponent } from './token-text-part-feature/token-text-part-feature.component';
import { CategoriesPartFeatureComponent } from './categories-part-feature/categories-part-feature.component';
import {
  CATEGORIES_PART_TYPEID,
  CHRONOLOGY_FRAGMENT_TYPEID
} from '@cadmus/parts/general/general-ui';
import { KeywordsPartFeatureComponent } from './keywords-part-feature/keywords-part-feature.component';
import { ChronologyFragmentFeatureComponent } from './chronology-fragment-feature/chronology-fragment-feature.component';
import { HistoricalDatePartFeatureComponent } from './historical-date-part-feature/historical-date-part-feature.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: `${CATEGORIES_PART_TYPEID}/:pid`,
        pathMatch: 'full',
        component: CategoriesPartFeatureComponent,
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: `${HISTORICAL_DATE_PART_TYPEID}/:pid`,
        pathMatch: 'full',
        component: HistoricalDatePartFeatureComponent,
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: `${KEYWORDS_PART_TYPEID}/:pid`,
        pathMatch: 'full',
        component: KeywordsPartFeatureComponent,
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: `${NOTE_PART_TYPEID}/:pid`,
        pathMatch: 'full',
        component: NotePartFeatureComponent,
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: `${TOKEN_TEXT_PART_TYPEID}/:pid`,
        pathMatch: 'full',
        component: TokenTextPartFeatureComponent,
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: `fragment/:pid/${COMMENT_FRAGMENT_TYPEID}/:loc`,
        pathMatch: 'full',
        component: CommentFragmentFeatureComponent,
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: `fragment/:pid/${CHRONOLOGY_FRAGMENT_TYPEID}/:loc`,
        pathMatch: 'full',
        component: ChronologyFragmentFeatureComponent,
        canDeactivate: [PendingChangesGuard]
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
    HistoricalDatePartFeatureComponent,
    KeywordsPartFeatureComponent,
    NotePartFeatureComponent,
    TokenTextPartFeatureComponent
  ],
  exports: [
    CategoriesPartFeatureComponent,
    ChronologyFragmentFeatureComponent,
    CommentFragmentFeatureComponent,
    HistoricalDatePartFeatureComponent,
    KeywordsPartFeatureComponent,
    NotePartFeatureComponent,
    TokenTextPartFeatureComponent
  ]
})
export class GeneralFeatureModule {}
