import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';

import { MaterialModule } from '@cadmus/material';
import { ApiModule } from '@cadmus/api';
import { UiModule } from '@cadmus/ui';
import { EditStateModule } from '@cadmus/features/edit-state';

import { ItemQueryComponent } from './item-query/item-query.component';
import { ItemSearchComponent } from './item-search/item-search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ItemSearchComponent }
    ]),
    MomentModule,
    // cadmus
    ApiModule,
    MaterialModule,
    UiModule,
    EditStateModule
  ],
  declarations: [ItemQueryComponent, ItemSearchComponent],
  exports: [ItemQueryComponent, ItemSearchComponent]
})
export class FeatureItemSearchModule {}
