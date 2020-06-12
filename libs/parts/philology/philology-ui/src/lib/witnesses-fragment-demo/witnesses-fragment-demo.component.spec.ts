import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';

import { WitnessesFragmentDemoComponent } from './witnesses-fragment-demo.component';
import { WitnessesFragmentComponent } from '../witnesses-fragment/witnesses-fragment.component';
import { UiModule } from '@cadmus/ui';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MarkdownModule } from 'ngx-markdown';
import { JsonSchemaService } from '@cadmus/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WitnessesFragmentDemoComponent', () => {
  let component: WitnessesFragmentDemoComponent;
  let fixture: ComponentFixture<WitnessesFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MonacoEditorModule.forRoot(),
        MarkdownModule.forRoot(),
        MaterialModule,
        UiModule,
      ],
      providers: [
        {
          provide: JsonSchemaService,
          useValue: {
            addSchema: () => {},
          },
        },
      ],
      declarations: [
        WitnessesFragmentComponent,
        WitnessesFragmentDemoComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitnessesFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
