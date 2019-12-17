import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { UserHomeComponent } from './user-home/user-home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: UserHomeComponent
      },
      {
        path: 'change-password',
        pathMatch: 'full',
        component: ChangePasswordComponent
      }
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    ApiModule,
    UiModule
  ],
  declarations: [
    ChangePasswordComponent,
    UserHomeComponent
  ],
  exports: [
    ChangePasswordComponent,
    UserHomeComponent
  ]
})
export class FeatureUserModule {}
