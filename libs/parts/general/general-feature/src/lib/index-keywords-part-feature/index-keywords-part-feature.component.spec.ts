import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexKeywordsPartFeatureComponent } from './index-keywords-part-feature.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { GeneralUiModule } from '@cadmus/parts/general/general-ui';
import { EditStateModule } from '@cadmus/features/edit-state';
import { FeaturesUiModule } from '@cadmus/features/features-ui';
import { RouterTestingModule } from '@angular/router/testing';

describe('IndexKeywordsPartFeatureComponent', () => {
  let component: IndexKeywordsPartFeatureComponent;
  let fixture: ComponentFixture<IndexKeywordsPartFeatureComponent>;

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
      declarations: [IndexKeywordsPartFeatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexKeywordsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
