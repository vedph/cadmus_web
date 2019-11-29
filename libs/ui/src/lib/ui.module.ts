import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@cadmus/material';

// Monaco
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { PartEditorBaseComponent } from './components/part-editor-base/part-editor-base.component';
import { CoreModule } from '@cadmus/core';
import { JsonEditorResourcesComponent } from './components/json-editor-resources/json-editor-resources.component';
import { ErrorListComponent } from './components/error-list/error-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    CoreModule,
    MaterialModule
  ],
  declarations: [
    ConfirmDialogComponent,
    SafeHtmlPipe,
    PartEditorBaseComponent,
    JsonEditorResourcesComponent,
    ErrorListComponent,
  ],
  exports: [
    ConfirmDialogComponent,
    SafeHtmlPipe,
    PartEditorBaseComponent,
    JsonEditorResourcesComponent,
    ErrorListComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class UiModule { }
