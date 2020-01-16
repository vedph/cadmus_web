import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';

import { OrthographyFragmentFeatureComponent } from './orthography-fragment-feature.component';
import { OrthographyFragmentComponent } from '@cadmus/parts/philology/philology-ui';
import { CurrentItemBarComponent } from '@cadmus/features/features-ui';

describe('OrthographyFragmentFeatureComponent', () => {
  let component: OrthographyFragmentFeatureComponent;
  let fixture: ComponentFixture<OrthographyFragmentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
        OrthographyFragmentComponent,
        OrthographyFragmentFeatureComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthographyFragmentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
