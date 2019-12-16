import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'register',
        pathMatch: 'full',
        component: AdminRegistrationComponent
      }
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    ApiModule,
    UiModule
  ],
  declarations: [AdminRegistrationComponent],
  exports: [AdminRegistrationComponent]
})
export class FeatureAdminModule {}
