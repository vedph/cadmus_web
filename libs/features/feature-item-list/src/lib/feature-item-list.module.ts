import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MomentModule } from 'ngx-moment';

import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFilterComponent } from './item-filter/item-filter.component';
import { EditStateModule } from '@cadmus/features/edit-state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ItemListComponent}
    ]),
    MomentModule,
    // cadmus
    ApiModule,
    MaterialModule,
    UiModule,
    EditStateModule
  ],
  declarations: [
    ItemListComponent,
    ItemFilterComponent
  ],
  exports: [
    ItemListComponent
  ]
})
export class FeatureItemListModule {}
