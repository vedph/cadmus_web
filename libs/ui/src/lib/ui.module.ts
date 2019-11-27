import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@cadmus/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ConfirmDialogComponent,
    SafeHtmlPipe
  ],
  exports: [
    ConfirmDialogComponent,
    SafeHtmlPipe
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class UiModule { }
