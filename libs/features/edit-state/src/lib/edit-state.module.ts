import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@cadmus/core';
import { ApiModule } from '@cadmus/api';
import { MaterialModule } from '@cadmus/material';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ApiModule,
    MaterialModule
  ]
})
export class EditStateModule {}
