import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexKeywordsPartComponent } from './index-keywords-part.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IndexKeywordComponent } from '../index-keyword/index-keyword.component';

describe('IndexKeywordsPartComponent', () => {
let component: IndexKeywordsPartComponent;
  let fixture: ComponentFixture<IndexKeywordsPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        CoreModule,
        MaterialModule,
        UiModule,
      ],
      declarations: [
        IndexKeywordComponent,
        IndexKeywordsPartComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexKeywordsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
