import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { config } from '../environments/environment';
import { AppComponent } from './app.component';

// flex
import { FlexLayoutModule } from '@angular/flex-layout';
// ngx monaco
import { MonacoEditorModule } from 'ngx-monaco-editor';
// ngx markdown
import { MarkdownModule } from 'ngx-markdown';
// Akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { CoreModule } from '@cadmus/core';
import { UiModule } from '@cadmus/ui';
import { GeneralUiModule } from '@cadmus/parts/general/general-ui';
import { PhilologyUiModule } from '@cadmus/parts/philology/philology-ui';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '@cadmus/material';
import { FeatureNotePartDemoComponent } from './demo/feature-note-part-demo/feature-note-part-demo.component';
import { FeatureOrthographyFragmentDemoComponent } from './demo/feature-orthography-fragment-demo/feature-orthography-fragment-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeatureNotePartDemoComponent,
    FeatureOrthographyFragmentDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        {
          path: 'demo/note-part',
          component: FeatureNotePartDemoComponent,
          pathMatch: 'full'
        },
        {
          path: 'demo/orthography-fragment',
          component: FeatureOrthographyFragmentDemoComponent,
          pathMatch: 'full'
        },
        {
          path: 'demo/layers',
          loadChildren: () =>
            import('@cadmus/features/feature-layer-demo').then(
              module => module.FeatureLayerDemoModule
            )
        },
        {
          path: 'items',
          loadChildren: () => import('@cadmus/features/feature-item-list').then(
            module => module.FeatureItemListModule
          )
        },
        { path: '**', component: HomeComponent },
        {
          path: 'features-feature-item-list',
          loadChildren: () =>
            import('@cadmus/features/feature-item-list').then(
              module => module.FeatureItemListModule
            )
        }
      ],
      {
        initialNavigation: 'enabled',
        useHash: true
      }
    ),
    // flex
    FlexLayoutModule,
    // Monaco
    MonacoEditorModule.forRoot(),
    // markdown
    MarkdownModule.forRoot(),
    // Akita
    AkitaNgDevtools.forRoot(),
    // Cadmus
    CoreModule,
    MaterialModule,
    GeneralUiModule,
    PhilologyUiModule,
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
