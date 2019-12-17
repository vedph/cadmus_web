import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ResetPasswordComponent }
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    ApiModule,
    UiModule
  ],
  declarations: [ResetPasswordComponent],
  exports: [ResetPasswordComponent]
})
export class FeatureResetPasswordModule {}
