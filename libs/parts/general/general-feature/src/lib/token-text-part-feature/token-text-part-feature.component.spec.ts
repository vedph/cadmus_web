import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { TokenTextPartFeatureComponent } from './token-text-part-feature.component';
import { CurrentItemBarComponent } from '@cadmus/features/features-ui';
import { TokenTextPartComponent } from '@cadmus/parts/general/general-ui';
import { MomentModule } from 'ngx-moment';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TokenTextPartFeatureComponent', () => {
  let component: TokenTextPartFeatureComponent;
  let fixture: ComponentFixture<TokenTextPartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AkitaNgDevtools.forRoot(),
        MonacoEditorModule.forRoot(),
        MomentModule,
        MaterialModule,
        UiModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        },
        {
          provide: 'apiEndpoint',
          useValue: 'http://localhost:60304/api/'
        },
        {
          provide: 'databaseId',
          useValue: 'cadmus'
        }
      ],
      declarations: [
        CurrentItemBarComponent,
        TokenTextPartComponent,
        TokenTextPartFeatureComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenTextPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
