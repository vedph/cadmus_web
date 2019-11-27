import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CoreModule } from '@cadmus/core';
import { UiModule } from '@cadmus/ui';
import { FeaturesFeatureLayerDemoModule } from '@cadmus/features/feature-layer-demo';
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
              module => module.FeaturesFeatureLayerDemoModule
            )
        },
        { path: '**', component: HomeComponent }
      ],
      {
        initialNavigation: 'enabled',
        useHash: true
      }
    ),
    // Cadmus
    CoreModule,
    MaterialModule,
    FeaturesFeatureLayerDemoModule,
    PartsPhilologyPhilologyUiModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
