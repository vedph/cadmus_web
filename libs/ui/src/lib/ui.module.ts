import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@cadmus/material';

// Monaco
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { PartEditorDemoComponent } from './components/part-editor-demo/part-editor-demo.component';
import { PartEditorBaseComponent } from './components/part-editor-base/part-editor-base.component';
import { CoreModule } from '@cadmus/core';
import { JsonEditorResourcesComponent } from './components/json-editor-resources/json-editor-resources.component';

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
    PartEditorDemoComponent,
    PartEditorBaseComponent,
    JsonEditorResourcesComponent,
  ],
  exports: [
    ConfirmDialogComponent,
    SafeHtmlPipe,
    PartEditorDemoComponent,
    PartEditorBaseComponent,
    JsonEditorResourcesComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class UiModule { }
