import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';

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
    MaterialModule
  ],
  declarations: [ItemListComponent]
})
export class FeatureItemListModule {}
