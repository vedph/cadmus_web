import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { HistoricalDatePartFeatureComponent } from './historical-date-part-feature.component';
import { CurrentItemBarComponent } from '@cadmus/features/features-ui';
import {
  HistoricalDatePartComponent,
  HISTORICAL_DATE_PART_TYPEID,
} from '@cadmus/parts/general/general-ui';
import { MomentModule } from 'ngx-moment';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@cadmus/core';

describe('HistoricalDatePartFeatureComponent', () => {
  let component: HistoricalDatePartFeatureComponent;
  let fixture: ComponentFixture<HistoricalDatePartFeatureComponent>;

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
        CoreModule,
        MaterialModule,
        UiModule,
      ],
      providers: [
        {
          provide: 'partEditorKeys',
          useValue: {
            [HISTORICAL_DATE_PART_TYPEID]: {
              part: 'general',
            },
          },
        },
      ],
      declarations: [
        CurrentItemBarComponent,
        HistoricalDatePartComponent,
        HistoricalDatePartFeatureComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDatePartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
