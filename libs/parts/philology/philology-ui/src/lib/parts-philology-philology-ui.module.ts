import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MspOperationComponent } from './msp-operation/msp-operation.component';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // cadmus
    CoreModule,
    MaterialModule
  ],
  declarations: [
    MspOperationComponent
  ],
  exports: [
    MspOperationComponent
  ]
})
export class PartsPhilologyPhilologyUiModule {}