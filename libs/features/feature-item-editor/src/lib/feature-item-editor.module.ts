import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { EditStateModule } from '@cadmus/features/edit-state';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import { CurrentItemBarComponent } from './current-item-bar/current-item-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ItemEditorComponent }
    ]),
    MomentModule,
    // cadmus
    CoreModule,
    MaterialModule,
    ApiModule,
    UiModule,
    EditStateModule
  ],
  declarations: [
    ItemEditorComponent,
    CurrentItemBarComponent
  ],
  exports: [
    ItemEditorComponent,
    CurrentItemBarComponent
  ]
})
export class FeatureItemEditorModule {}
