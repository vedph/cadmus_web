import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { KeywordsPartFeatureComponent } from './keywords-part-feature.component';
import { CurrentItemBarComponent } from '@cadmus/features/features-ui';
import { KeywordsPartComponent } from '@cadmus/parts/general/general-ui';
import { MomentModule } from 'ngx-moment';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('KeywordsPartFeatureComponent', () => {
  let component: KeywordsPartFeatureComponent;
  let fixture: ComponentFixture<KeywordsPartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AkitaNgDevtools.forRoot(),
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
        KeywordsPartComponent,
        KeywordsPartFeatureComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
