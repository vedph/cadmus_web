import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { EditStateModule } from '@cadmus/features/edit-state';
import { CurrentItemBarComponent } from './components/current-item-bar/current-item-bar.component';
import { CurrentLayerPartBarComponent } from './components/current-layer-part-bar/current-layer-part-bar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule,
    // cadmus
    CoreModule,
    MaterialModule,
    EditStateModule
  ],
  declarations: [
    CurrentItemBarComponent,
    CurrentLayerPartBarComponent
  ],
  exports: [
    CurrentItemBarComponent,
    CurrentLayerPartBarComponent
  ]
})
export class FeaturesUiModule {}
