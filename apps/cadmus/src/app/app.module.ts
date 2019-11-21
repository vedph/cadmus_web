import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { AppComponent } from './app.component';

import { CoreModule } from '@cadmus/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // Cadmus
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

