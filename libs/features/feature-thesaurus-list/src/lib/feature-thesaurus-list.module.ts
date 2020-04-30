import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MomentModule } from 'ngx-moment';

import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { ThesaurusListComponent } from './thesaurus-list/thesaurus-list.component';
import { ThesaurusFilterComponent } from './thesaurus-filter/thesaurus-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ThesaurusListComponent }
    ]),
    MomentModule,
    // cadmus
    ApiModule,
    MaterialModule,
    UiModule
  ],
  declarations: [ThesaurusListComponent, ThesaurusFilterComponent],
  exports: [ThesaurusListComponent]
})
export class FeatureThesaurusListModule {}
