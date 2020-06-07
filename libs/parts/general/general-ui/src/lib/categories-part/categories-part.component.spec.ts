import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPartComponent } from './categories-part.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { UiModule } from '@cadmus/ui';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';

describe('CategoriesPartComponent', () => {
  let component: CategoriesPartComponent;
  let fixture: ComponentFixture<CategoriesPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UiModule,
      ],
      declarations: [CategoriesPartComponent],
      providers: [
        {
          provide: NGX_MONACO_EDITOR_CONFIG,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
