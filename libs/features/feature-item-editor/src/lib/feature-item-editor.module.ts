import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClipboardModule  } from '@angular/cdk/clipboard';

import { MomentModule } from 'ngx-moment';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { EditStateModule } from '@cadmus/features/edit-state';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import { PartsScopeEditorComponent } from './parts-scope-editor/parts-scope-editor.component';
import { MissingPartsComponent } from './missing-parts/missing-parts.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ItemEditorComponent }
    ]),
    ClipboardModule,
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
    MissingPartsComponent,
    PartsScopeEditorComponent
  ],
  exports: [ItemEditorComponent]
})
export class FeatureItemEditorModule {}
