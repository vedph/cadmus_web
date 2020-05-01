import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';

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
import { CloseSaveButtonsComponent } from './components/close-save-buttons/close-save-buttons.component';
import { DatationEditorComponent } from './components/datation-editor/datation-editor.component';
import { HistoricalDateEditorComponent } from './components/historical-date-editor/historical-date-editor.component';
import { PasswordStrengthBarComponent } from './components/password-strength-bar/password-strength-bar.component';
import { RouterModule } from '@angular/router';
import { LayerHintsComponent } from './components/layer-hints/layer-hints.component';
import { FlagsBadgeComponent } from './components/flags-badge/flags-badge.component';
import { FacetBadgeComponent } from './components/facet-badge/facet-badge.component';
import { PartBadgeComponent } from './components/part-badge/part-badge.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    // cadmus
    CoreModule,
    ApiModule,
    MaterialModule
  ],
  declarations: [
    ConfirmDialogComponent,
    CloseSaveButtonsComponent,
    DatationEditorComponent,
    DecoratedTokenTextComponent,
    ErrorListComponent,
    FacetBadgeComponent,
    FlagsBadgeComponent,
    HistoricalDateEditorComponent,
    JsonEditorResourcesComponent,
    LayerHintsComponent,
    LoginComponent,
    PartBadgeComponent,
    PasswordStrengthBarComponent,
    SafeHtmlPipe
  ],
  exports: [
    ConfirmDialogComponent,
    CloseSaveButtonsComponent,
    DatationEditorComponent,
    DecoratedTokenTextComponent,
    ErrorListComponent,
    FacetBadgeComponent,
    FlagsBadgeComponent,
    HistoricalDateEditorComponent,
    JsonEditorResourcesComponent,
    LayerHintsComponent,
    LoginComponent,
    PartBadgeComponent,
    PasswordStrengthBarComponent,
    SafeHtmlPipe
  ],
  // entryComponents: [
  //   ConfirmDialogComponent
  // ]
})
export class UiModule { }
