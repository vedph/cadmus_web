import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { ItemFilterComponent } from './item-filter/item-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ItemListComponent}
    ]),
    // cadmus
    ApiModule,
    MaterialModule,
    UiModule
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
