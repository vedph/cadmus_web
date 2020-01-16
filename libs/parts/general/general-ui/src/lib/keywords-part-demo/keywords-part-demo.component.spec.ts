import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { KeywordsPartDemoComponent } from './keywords-part-demo.component';
import { KeywordsPartComponent } from '../keywords-part/keywords-part.component';
import { UiModule } from '@cadmus/ui';

describe('KeywordsPartDemoComponent', () => {
  let component: KeywordsPartDemoComponent;
  let fixture: ComponentFixture<KeywordsPartDemoComponent>;

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
        KeywordsPartComponent,
        KeywordsPartDemoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
