import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexKeywordsPartDemoComponent } from './index-keywords-part-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { IndexKeywordsPartComponent } from '../index-keywords-part/index-keywords-part.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IndexKeywordComponent } from '../index-keyword/index-keyword.component';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';

describe('IndexKeywordsPartDemoComponent', () => {
  let component: IndexKeywordsPartDemoComponent;
  let fixture: ComponentFixture<IndexKeywordsPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        NoopAnimationsModule,
        MaterialModule,
        UiModule,
      ],
      declarations: [
        IndexKeywordComponent,
        IndexKeywordsPartComponent,
        IndexKeywordsPartDemoComponent,
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
    fixture = TestBed.createComponent(IndexKeywordsPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
