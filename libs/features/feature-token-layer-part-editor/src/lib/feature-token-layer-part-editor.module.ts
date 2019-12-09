import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '@cadmus/material';
import { CoreModule } from '@cadmus/core';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { EditStateModule } from '@cadmus/features/edit-state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    ApiModule,
    UiModule,
    EditStateModule
  ]
})
export class FeatureTokenLayerPartEditorModule {}
