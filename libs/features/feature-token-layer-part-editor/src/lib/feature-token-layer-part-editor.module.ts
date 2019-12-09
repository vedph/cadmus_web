import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '@cadmus/material';
import { CoreModule } from '@cadmus/core';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { EditStateModule } from '@cadmus/features/edit-state';
import { FeaturesUiModule } from '@cadmus/features/features-ui';
import { TokenLayerPartEditorComponent } from './token-layer-part-editor/token-layer-part-editor.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TokenLayerPartEditorComponent }
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    ApiModule,
    UiModule,
    EditStateModule,
    FeaturesUiModule
  ],
  declarations: [TokenLayerPartEditorComponent],
  exports: [TokenLayerPartEditorComponent]
})
export class FeatureTokenLayerPartEditorModule {}
