import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { ChronologyFragmentComponent } from './chronology-fragment.component';
import { UiModule } from '@cadmus/ui';

describe('ChronologyFragmentComponent', () => {
  let component: ChronologyFragmentComponent;
  let fixture: ComponentFixture<ChronologyFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
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
        ChronologyFragmentComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologyFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
