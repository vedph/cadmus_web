import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MomentModule } from 'ngx-moment';

import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    MomentModule,
    // cadmus
    ApiModule,
    MaterialModule,
    UiModule,
  ]
})
export class FeatureThesaurusListModule {}
