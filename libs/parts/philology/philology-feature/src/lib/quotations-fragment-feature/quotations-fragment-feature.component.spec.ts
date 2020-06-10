import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsFragmentFeatureComponent } from './quotations-fragment-feature.component';
import { QUOTATIONS_FRAGMENT_TYPEID, QuotationsFragmentComponent, QuotationEntryComponent } from '@cadmus/parts/philology/philology-ui';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { CurrentItemBarComponent } from '@cadmus/features/features-ui';

describe('QuotationsFragmentFeatureComponent', () => {
  let component: QuotationsFragmentFeatureComponent;
  let fixture: ComponentFixture<QuotationsFragmentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MomentModule,
        MaterialModule,
        UiModule,
      ],
      providers: [
        {
          provide: 'partEditorKeys',
          useValue: {
            [QUOTATIONS_FRAGMENT_TYPEID]: {
              part: 'philology',
            },
          },
        },
      ],
      declarations: [
        CurrentItemBarComponent,
        QuotationEntryComponent,
        QuotationsFragmentComponent,
        QuotationsFragmentFeatureComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationsFragmentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
