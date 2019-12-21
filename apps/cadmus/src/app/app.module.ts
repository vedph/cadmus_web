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

import { CoreModule, PendingChangesGuard } from '@cadmus/core';
import { UiModule } from '@cadmus/ui';
import { GeneralUiModule } from '@cadmus/parts/general/general-ui';
import { PhilologyUiModule } from '@cadmus/parts/philology/philology-ui';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '@cadmus/material';
import { FeatureNotePartDemoComponent } from './demo/feature-note-part-demo/feature-note-part-demo.component';
import { FeatureOrthographyFragmentDemoComponent } from './demo/feature-orthography-fragment-demo/feature-orthography-fragment-demo.component';
import {
  AuthInterceptor,
  AdminGuardService,
  AuthGuardService
} from '@cadmus/api';
import { FeatureTokenTextPartDemoComponent } from './demo/feature-token-text-part-demo/feature-token-text-part-demo.component';
import { FeatureCommentFragmentDemoComponent } from './demo/feature-comment-fragment-demo/feature-comment-fragment-demo.component';
import { FeatureCategoriesPartDemoComponent } from './demo/feature-categories-part-demo/feature-categories-part-demo.component';
import { FeatureKeywordsPartDemoComponent } from './demo/feature-keywords-part-demo/feature-keywords-part-demo.component';
import { FeatureHistoricalDatePartDemoComponent } from './demo/feature-historical-date-part-demo/feature-historical-date-part-demo.component';
import { FeatureChronologyFragmentDemoComponent } from './demo/feature-chronology-fragment-demo/feature-chronology-fragment-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeatureNotePartDemoComponent,
    FeatureOrthographyFragmentDemoComponent,
    FeatureTokenTextPartDemoComponent,
    FeatureCommentFragmentDemoComponent,
    FeatureCategoriesPartDemoComponent,
    FeatureKeywordsPartDemoComponent,
    FeatureHistoricalDatePartDemoComponent,
    FeatureChronologyFragmentDemoComponent
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
          path: 'demo/categories-part',
          component: FeatureCategoriesPartDemoComponent,
          pathMatch: 'full'
        },
        {
          path: 'demo/keywords-part',
          component: FeatureKeywordsPartDemoComponent,
          pathMatch: 'full'
        },
        {
          path: 'demo/note-part',
          component: FeatureNotePartDemoComponent,
          pathMatch: 'full'
        },
        {
          path: 'demo/historical-date-part',
          component: FeatureHistoricalDatePartDemoComponent,
          pathMatch: 'full'
        },
        {
          path: 'demo/token-text-part',
          component: FeatureTokenTextPartDemoComponent,
          pathMatch: 'full'
        },
        {
          path: 'demo/comment-fragment',
          component: FeatureCommentFragmentDemoComponent,
          pathMatch: 'full'
        },
        {
          path: 'demo/chronology-fragment',
          component: FeatureChronologyFragmentDemoComponent,
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
            ),
          canActivate: [AuthGuardService]
        },
        {
          path: 'items/:id',
          loadChildren: () =>
            import('@cadmus/features/feature-item-editor').then(
              module => module.FeatureItemEditorModule
            ),
          canActivate: [AuthGuardService],
          canDeactivate: [PendingChangesGuard]
        },
        {
          path: 'items/:iid/general',
          loadChildren: () =>
            import('@cadmus/parts/general/general-feature').then(
              module => module.GeneralFeatureModule
            ),
          canActivate: [AuthGuardService]
        },
        {
          path: 'items/:iid/layer/token/:pid',
          loadChildren: () =>
            import('@cadmus/features/feature-token-layer-part-editor').then(
              module => module.FeatureTokenLayerPartEditorModule
            ),
          canActivate: [AuthGuardService]
        },
        {
          path: 'admin',
          loadChildren: () =>
            import('@cadmus/features/feature-admin').then(
              module => module.FeatureAdminModule
            ),
          canActivate: [AdminGuardService]
        },
        {
          path: 'user',
          loadChildren: () =>
            import('@cadmus/features/feature-user').then(
              module => module.FeatureUserModule
            ),
          canActivate: [AuthGuardService]
        },
        {
          path: 'reset-password',
          loadChildren: () =>
            import('@cadmus/features/feature-reset-password').then(
              module => module.FeatureResetPasswordModule
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
