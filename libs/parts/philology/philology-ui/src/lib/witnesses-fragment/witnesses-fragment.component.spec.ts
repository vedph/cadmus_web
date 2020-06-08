import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { WitnessesFragmentComponent } from './witnesses-fragment.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { UiModule } from '@cadmus/ui';
import { MarkdownModule } from 'ngx-markdown';
import { JsonSchemaService } from '@cadmus/core';

describe('WitnessesFragmentComponent', () => {
  let component: WitnessesFragmentComponent;
  let fixture: ComponentFixture<WitnessesFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MonacoEditorModule.forRoot(),
        MarkdownModule.forRoot(),
        MaterialModule,
        UiModule
      ],
      providers: [
        {
          provide: JsonSchemaService,
          useValue: {},
        },
      ],
      declarations: [
        WitnessesFragmentComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitnessesFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
