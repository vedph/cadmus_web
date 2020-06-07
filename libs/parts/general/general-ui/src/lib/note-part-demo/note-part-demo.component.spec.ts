import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';

import { NotePartDemoComponent } from './note-part-demo.component';
import { NotePartComponent } from '../note-part/note-part.component';
import { UiModule } from '@cadmus/ui';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MarkdownModule } from 'ngx-markdown';

describe('NotePartDemoComponent', () => {
  let component: NotePartDemoComponent;
  let fixture: ComponentFixture<NotePartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MonacoEditorModule,
        MarkdownModule,
        UiModule,
      ],
      declarations: [NotePartComponent, NotePartDemoComponent],
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
