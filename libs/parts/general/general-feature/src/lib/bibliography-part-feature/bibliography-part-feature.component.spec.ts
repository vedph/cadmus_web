import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographyPartFeatureComponent } from './bibliography-part-feature.component';
import { UiModule } from '@cadmus/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import {
  GeneralUiModule,
  BIBLIOGRAPHY_PART_TYPEID,
} from '@cadmus/parts/general/general-ui';
import { EditStateModule } from '@cadmus/features/edit-state';
import { FeaturesUiModule } from '@cadmus/features/features-ui';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { RouterTestingModule } from '@angular/router/testing';

describe('BibliographyPartFeatureComponent', () => {
  let component: BibliographyPartFeatureComponent;
  let fixture: ComponentFixture<BibliographyPartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        AkitaNgDevtools.forRoot(),
        CoreModule,
        MaterialModule,
        UiModule,
        GeneralUiModule,
        EditStateModule,
        FeaturesUiModule,
      ],
      declarations: [BibliographyPartFeatureComponent],
      providers: [
        {
          provide: 'partEditorKeys',
          useValue: {
            [BIBLIOGRAPHY_PART_TYPEID]: {
              part: 'general',
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliographyPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
