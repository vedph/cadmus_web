import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MspOperationComponent } from './msp-operation/msp-operation.component';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { OrthographyFragmentComponent } from './orthography-fragment/orthography-fragment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // cadmus
    CoreModule,
    MaterialModule,
    UiModule
  ],
  declarations: [
    MspOperationComponent,
    OrthographyFragmentComponent
  ],
  exports: [
    MspOperationComponent,
    OrthographyFragmentComponent
  ]
})
export class PhilologyUiModule {}