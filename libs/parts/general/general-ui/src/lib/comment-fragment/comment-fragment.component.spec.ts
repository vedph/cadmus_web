import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { CommentFragmentComponent } from './comment-fragment.component';
import { UiModule } from '@cadmus/ui';
import {
  MonacoEditorModule,
  NGX_MONACO_EDITOR_CONFIG
} from 'ngx-monaco-editor';
import { MarkdownModule } from 'ngx-markdown';

describe('CommentFragmentComponent', () => {
  let component: CommentFragmentComponent;
  let fixture: ComponentFixture<CommentFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        MonacoEditorModule.forRoot(),
        MarkdownModule.forRoot(),
        UiModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        },
        {
          provide: NGX_MONACO_EDITOR_CONFIG,
          useValue: {}
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
      declarations: [CommentFragmentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
