import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@cadmus/material';

// Monaco
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { CoreModule } from '@cadmus/core';
import { JsonEditorResourcesComponent } from './components/json-editor-resources/json-editor-resources.component';
import { ErrorListComponent } from './components/error-list/error-list.component';
import { LoginComponent } from './components/login/login.component';
import { DecoratedTokenTextComponent } from './components/decorated-token-text/decorated-token-text.component';

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
    DecoratedTokenTextComponent,
    ErrorListComponent,
    JsonEditorResourcesComponent,
    LoginComponent,
    SafeHtmlPipe,
  ],
  exports: [
    ConfirmDialogComponent,
    DecoratedTokenTextComponent,
    ErrorListComponent,
    JsonEditorResourcesComponent,
    LoginComponent,
    SafeHtmlPipe
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class UiModule { }
