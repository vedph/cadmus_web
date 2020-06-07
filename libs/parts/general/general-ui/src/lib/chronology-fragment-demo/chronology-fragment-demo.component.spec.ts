import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';

import { ChronologyFragmentDemoComponent } from './chronology-fragment-demo.component';
import { ChronologyFragmentComponent } from '../chronology-fragment/chronology-fragment.component';
import { UiModule } from '@cadmus/ui';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';

describe('ChronologyFragmentDemoComponent', () => {
  let component: ChronologyFragmentDemoComponent;
  let fixture: ComponentFixture<ChronologyFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MaterialModule,
        UiModule,
      ],
      declarations: [
        ChronologyFragmentComponent,
        ChronologyFragmentDemoComponent,
      ],
      providers: [
        {
          provide: NGX_MONACO_EDITOR_CONFIG,
          useValue: {},
        },
      ],
    }).compileComponents();
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
