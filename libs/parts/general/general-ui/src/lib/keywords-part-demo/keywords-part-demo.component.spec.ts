import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { KeywordsPartDemoComponent } from './keywords-part-demo.component';
import { KeywordsPartComponent } from '../keywords-part/keywords-part.component';
import { UiModule } from '@cadmus/ui';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';

describe('KeywordsPartDemoComponent', () => {
  let component: KeywordsPartDemoComponent;
  let fixture: ComponentFixture<KeywordsPartDemoComponent>;

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
      declarations: [KeywordsPartComponent, KeywordsPartDemoComponent],
      providers: [
        {
          provide: NGX_MONACO_EDITOR_CONFIG,
          useValue: {},
        },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
