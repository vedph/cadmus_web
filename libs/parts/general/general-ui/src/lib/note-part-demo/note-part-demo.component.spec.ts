import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';

import { NotePartDemoComponent } from './note-part-demo.component';
import { NotePartComponent } from '../note-part/note-part.component';
import { UiModule } from '@cadmus/ui';
import {
  MonacoEditorModule,
  NGX_MONACO_EDITOR_CONFIG,
} from 'ngx-monaco-editor';
import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NotePartDemoComponent', () => {
  let component: NotePartDemoComponent;
  let fixture: ComponentFixture<NotePartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MaterialModule,
        MonacoEditorModule,
        MarkdownModule,
        UiModule,
      ],
      declarations: [NotePartComponent, NotePartDemoComponent],
      providers: [
        {
          provide: NGX_MONACO_EDITOR_CONFIG,
          useValue: {},
        },
        {
          provide: MarkedOptions,
          useValue: {},
        },
        MarkdownService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
