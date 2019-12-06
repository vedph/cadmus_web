import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { GeneralUiModule } from '@cadmus/parts/general/general-ui';

import { NotePartFeatureComponent } from './note-part-feature/note-part-feature.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'net.fusisoft.note/:pid',
        pathMatch: 'full',
        component: NotePartFeatureComponent
      }
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    UiModule,
    GeneralUiModule
  ],
  declarations: [
    NotePartFeatureComponent
  ],
  exports: [
    NotePartFeatureComponent
  ]
})
export class GeneralFeatureModule {}
