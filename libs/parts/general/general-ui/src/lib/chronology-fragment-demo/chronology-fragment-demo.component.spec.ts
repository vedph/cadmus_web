import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { ChronologyFragmentDemoComponent } from './chronology-fragment-demo.component';
import { ChronologyFragmentComponent } from '../chronology-fragment/chronology-fragment.component';
import { UiModule } from '@cadmus/ui';

describe('ChronologyFragmentDemoComponent', () => {
  let component: ChronologyFragmentDemoComponent;
  let fixture: ComponentFixture<ChronologyFragmentDemoComponent>;

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
        }
      ],
      declarations: [
        ChronologyFragmentComponent,
        ChronologyFragmentDemoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologyFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
