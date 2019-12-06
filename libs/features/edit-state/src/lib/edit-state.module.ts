import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@cadmus/core';
import { ApiModule } from '@cadmus/api';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ApiModule
  ]
})
export class EditStateModule {}
