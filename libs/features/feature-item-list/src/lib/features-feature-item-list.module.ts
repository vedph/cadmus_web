import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { MaterialModule } from '@cadmus/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ItemListComponent}
    ]),
    // cadmus
    MaterialModule
  ],
  declarations: [ItemListComponent]
})
export class FeaturesFeatureItemListModule {}
