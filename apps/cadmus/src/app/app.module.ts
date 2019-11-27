import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { config } from '../environments/environment';
import { AppComponent } from './app.component';

// Monaco
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { CoreModule } from '@cadmus/core';
import { UiModule } from '@cadmus/ui';
import { PartsPhilologyPhilologyUiModule } from '@cadmus/parts/philology/philology-ui';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '@cadmus/material';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        {
          path: 'demo/layers',
          loadChildren: () =>
            import('@cadmus/features/feature-layer-demo').then(
              module => module.FeatureLayerDemoModule
            )
        },
        { path: '**', component: HomeComponent }
      ],
      {
        initialNavigation: 'enabled',
        useHash: true
      }
    ),
    // Monaco
    MonacoEditorModule.forRoot(),
    // Cadmus
    CoreModule,
    MaterialModule,
    PartsPhilologyPhilologyUiModule,
    UiModule
  ],
  providers: [
    // config
    // https://github.com/nrwl/nx/issues/208#issuecomment-384102058
    {
      provide: 'apiEndpoint',
      useValue: config.apiEndpoint
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
