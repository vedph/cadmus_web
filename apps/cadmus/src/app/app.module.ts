import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { AuthInterceptor } from '@cadmus/api';
import { FeatureTokenTextPartDemoComponent } from './demo/feature-token-text-part-demo/feature-token-text-part-demo.component';
import { FeatureCommentFragmentDemoComponent } from './demo/feature-comment-fragment-demo/feature-comment-fragment-demo.component';
import { TokenTextPartDemoComponent } from 'libs/parts/general/general-ui/src/lib/token-text-part-demo/token-text-part-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeatureNotePartDemoComponent,
    FeatureOrthographyFragmentDemoComponent,
    FeatureTokenTextPartDemoComponent,
    FeatureCommentFragmentDemoComponent
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
          path: 'login',
          loadChildren: () =>
            import('@cadmus/features/feature-login').then(
              module => module.FeatureLoginModule
            )
        },
        {
          path: 'demo/note-part',
          component: FeatureNotePartDemoComponent,
          pathMatch: 'full'
        },
        {
          path: 'demo/token-text-part',
          component: TokenTextPartDemoComponent,
          pathMatch: 'full'
        },
        {
          path: 'demo/comment-fragment',
          component: FeatureCommentFragmentDemoComponent,
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
          loadChildren: () =>
            import('@cadmus/features/feature-item-list').then(
              module => module.FeatureItemListModule
            )
        },
        {
          path: 'items/:id',
          loadChildren: () =>
            import('@cadmus/features/feature-item-editor').then(
              module => module.FeatureItemEditorModule
            )
        },
        {
          path: 'items/:iid/general',
          loadChildren: () =>
            import('@cadmus/parts/general/general-feature').then(
              module => module.GeneralFeatureModule
            )
        },
        {
          path: 'items/:iid/layer/token/:pid',
          loadChildren: () =>
            import('@cadmus/features/feature-token-layer-part-editor').then(
              module => module.FeatureTokenLayerPartEditorModule
            )
        },
        { path: '**', component: HomeComponent }
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
    },
    {
      provide: 'databaseId',
      useValue: config.databaseId
    },
    // HTTP interceptor
    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
