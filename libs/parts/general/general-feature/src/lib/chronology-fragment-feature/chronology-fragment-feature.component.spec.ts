import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { ChronologyFragmentFeatureComponent } from './chronology-fragment-feature.component';
import { CurrentItemBarComponent } from '@cadmus/features/features-ui';
import {
  ChronologyFragmentComponent,
  CHRONOLOGY_FRAGMENT_TYPEID,
} from '@cadmus/parts/general/general-ui';
import { MomentModule } from 'ngx-moment';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@cadmus/core';
import { ActivatedRoute } from '@angular/router';

describe('ChronologyFragmentFeatureComponent', () => {
  let component: ChronologyFragmentFeatureComponent;
  let fixture: ComponentFixture<ChronologyFragmentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        AkitaNgDevtools.forRoot(),
        CoreModule,
        MaterialModule,
        MomentModule,
        UiModule,
      ],
      providers: [
        {
          provide: 'partEditorKeys',
          useValue: {
            [CHRONOLOGY_FRAGMENT_TYPEID]: {
              part: 'general',
            },
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                iid: '',
                pid: '',
                loc: '',
              },
              url: [{}, {}],
              queryParams: {},
            },
          },
        },
      ],
      declarations: [
        CurrentItemBarComponent,
        ChronologyFragmentComponent,
        ChronologyFragmentFeatureComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologyFragmentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
