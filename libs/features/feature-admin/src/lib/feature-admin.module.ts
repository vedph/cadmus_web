import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserFilterComponent } from './user-filter/user-filter.component';

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
      },
      {
        path: 'users',
        pathMatch: 'full',
        component: UserManagerComponent
      },
      {
        path: '',
        pathMatch: 'full',
        component: AdminHomeComponent
      }
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    ApiModule,
    UiModule
  ],
  declarations: [
    AdminHomeComponent,
    AdminRegistrationComponent,
    UserEditorComponent,
    UserManagerComponent,
    UserFilterComponent
  ],
  exports: [
    AdminHomeComponent,
    AdminRegistrationComponent,
    UserManagerComponent
  ]
})
export class FeatureAdminModule {}
