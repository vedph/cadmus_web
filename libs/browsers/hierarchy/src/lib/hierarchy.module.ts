import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { GeneralUiModule } from '@cadmus/parts/general/general-ui';
import { EditStateModule } from '@cadmus/features/edit-state';
import { HierarchyItemBrowserComponent } from './hierarchy-item-browser/hierarchy-item-browser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // cadmus
    CoreModule,
    MaterialModule,
    UiModule,
    GeneralUiModule,
    EditStateModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HierarchyItemBrowserComponent }
    ])
  ],
  declarations: [
    HierarchyItemBrowserComponent
  ],
  exports: [
    HierarchyItemBrowserComponent
  ]
})
export class HierarchyModule {}
