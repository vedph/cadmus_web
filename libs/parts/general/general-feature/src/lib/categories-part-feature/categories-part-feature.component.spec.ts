import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialModule } from '@cadmus/material';
import { MomentModule } from 'ngx-moment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { UiModule } from '@cadmus/ui';
import { CategoriesPartFeatureComponent } from './categories-part-feature.component';
import { CurrentItemBarComponent } from '@cadmus/features/features-ui';
import {
  CategoriesPartComponent,
  CATEGORIES_PART_TYPEID,
} from '@cadmus/parts/general/general-ui';
import { CoreModule } from '@cadmus/core';

describe('CategoriesPartFeatureComponent', () => {
  let component: CategoriesPartFeatureComponent;
  let fixture: ComponentFixture<CategoriesPartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
            [CATEGORIES_PART_TYPEID]: {
              part: 'general',
            },
          },
        },
      ],
      declarations: [
        CurrentItemBarComponent,
        CategoriesPartComponent,
        CategoriesPartFeatureComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
