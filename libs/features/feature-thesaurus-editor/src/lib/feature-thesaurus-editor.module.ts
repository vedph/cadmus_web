import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { EditStateModule } from '@cadmus/features/edit-state';
import { ThesaurusEditorComponent } from './thesaurus-editor/thesaurus-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ThesaurusEditorComponent }
    ]),
    // cadmus
    ApiModule,
    MaterialModule,
    UiModule,
    EditStateModule
  ],
  declarations: [ThesaurusEditorComponent],
  exports: [ThesaurusEditorComponent]
})
export class FeatureThesaurusEditorModule {}
