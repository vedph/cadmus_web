import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@cadmus/core';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    // cadmus
    CoreModule
  ],
})
export class ApiModule {}
