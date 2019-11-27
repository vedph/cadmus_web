import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { NotePartComponent } from './note-part/note-part.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // cadmus
    CoreModule,
    MaterialModule,
    UiModule
  ],
  declarations: [
    NotePartComponent
  ],
  exports: [
    NotePartComponent
  ]
})
export class GeneralUiModule {}
