import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { EditStateModule } from '@cadmus/features/edit-state';
import { CurrentItemBarComponent } from './components/current-item-bar/current-item-bar.component';

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
    CurrentItemBarComponent
  ],
  exports: [
    CurrentItemBarComponent
  ]
})
export class FeaturesUiModule {}
