import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { CommentFragmentDemoComponent } from './comment-fragment-demo.component';
import { CommentFragmentComponent } from '../comment-fragment/comment-fragment.component';
import { UiModule } from '@cadmus/ui';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MarkdownModule } from 'ngx-markdown';

describe('CommentFragmentDemoComponent', () => {
  let component: CommentFragmentDemoComponent;
  let fixture: ComponentFixture<CommentFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
          provide: 'apiEndpoint',
          useValue: 'http://localhost:60304/api/'
        },
        {
          provide: 'databaseId',
          useValue: 'cadmus'
        }
      ],
      declarations: [
        CommentFragmentComponent,
        CommentFragmentDemoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
