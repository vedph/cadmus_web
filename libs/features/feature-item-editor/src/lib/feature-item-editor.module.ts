import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ItemEditorComponent } from './item-editor/item-editor.component';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ItemEditorComponent }
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    ApiModule,
    UiModule
  ],
  declarations: [
    ItemEditorComponent
  ],
  exports: [
    ItemEditorComponent
  ]
})
export class FeatureItemEditorModule {}
