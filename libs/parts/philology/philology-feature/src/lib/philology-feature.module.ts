import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule, PendingChangesGuard } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { EditStateModule } from '@cadmus/features/edit-state';
import { FeaturesUiModule } from '@cadmus/features/features-ui';
import {
  PhilologyUiModule,
  APPARATUS_FRAGMENT_TYPEID,
  ORTHOGRAPHY_FRAGMENT_TYPEID
} from '@cadmus/parts/philology/philology-ui';
import { ApparatusFragmentFeatureComponent } from './apparatus-fragment-feature/apparatus-fragment-feature.component';
import { OrthographyFragmentFeatureComponent } from './orthography-fragment-feature/orthography-fragment-feature.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: `fragment/:pid/${APPARATUS_FRAGMENT_TYPEID}/:loc`,
        pathMatch: 'full',
        component: ApparatusFragmentFeatureComponent,
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: `fragment/:pid/${ORTHOGRAPHY_FRAGMENT_TYPEID}/:loc`,
        pathMatch: 'full',
        component: OrthographyFragmentFeatureComponent,
        canDeactivate: [PendingChangesGuard]
      }
    ]),
    // cadmus
    CoreModule,
    MaterialModule,
    UiModule,
    PhilologyUiModule,
    EditStateModule,
    FeaturesUiModule
  ],
  declarations: [
    ApparatusFragmentFeatureComponent,
    OrthographyFragmentFeatureComponent
  ],
  exports: [
    ApparatusFragmentFeatureComponent,
    OrthographyFragmentFeatureComponent
  ]
})
export class PhilologyFeatureModule {}
