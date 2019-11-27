import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayerDemoComponent } from './layer-demo/layer-demo.component';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LayerDemoComponent }
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    UiModule
  ],
  declarations: [LayerDemoComponent],
  exports: [LayerDemoComponent]
})
export class FeatureLayerDemoModule {}
