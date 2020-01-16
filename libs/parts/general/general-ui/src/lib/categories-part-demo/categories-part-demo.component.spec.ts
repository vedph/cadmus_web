import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPartDemoComponent } from './categories-part-demo.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { CategoriesPartComponent } from '../categories-part/categories-part.component';
import { UiModule } from '@cadmus/ui';

describe('CategoriesPartDemoComponent', () => {
  let component: CategoriesPartDemoComponent;
  let fixture: ComponentFixture<CategoriesPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UiModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        }
      ],
      declarations: [
        CategoriesPartComponent,
        CategoriesPartDemoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
