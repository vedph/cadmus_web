import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CoreModule } from '@cadmus/core';
import { PartsPhilologyPhilologyUiModule } from '@cadmus/parts/philology/philology-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // Cadmus
    CoreModule,
    PartsPhilologyPhilologyUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
