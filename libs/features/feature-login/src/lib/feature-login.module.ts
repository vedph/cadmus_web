import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '@cadmus/ui';
import { LoginPageComponent } from './login-page/login-page.component';
import { MaterialModule } from '@cadmus/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: LoginPageComponent }
    ]),
    // cadmus
    MaterialModule,
    UiModule
  ],
  declarations: [
    LoginPageComponent
  ],
  exports: [
    LoginPageComponent
  ]
})
export class FeatureLoginModule {}
