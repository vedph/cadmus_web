import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MspOperationComponent } from './msp-operation/msp-operation.component';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { OrthographyFragmentComponent } from './orthography-fragment/orthography-fragment.component';
import { OrthographyFragmentDemoComponent } from './orthography-fragment-demo/orthography-fragment-demo.component';
import { ApparatusFragmentComponent } from './apparatus-fragment/apparatus-fragment.component';
import { ApparatusFragmentDemoComponent } from './apparatus-fragment-demo/apparatus-fragment-demo.component';

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
    ApparatusFragmentComponent,
    ApparatusFragmentDemoComponent,
    MspOperationComponent,
    OrthographyFragmentComponent,
    OrthographyFragmentDemoComponent
  ],
  exports: [
    ApparatusFragmentComponent,
    ApparatusFragmentDemoComponent,
    MspOperationComponent,
    OrthographyFragmentComponent,
    OrthographyFragmentDemoComponent
  ]
})
export class PhilologyUiModule {}
