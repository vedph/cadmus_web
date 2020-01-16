import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDateEditorComponent } from './historical-date-editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { DatationEditorComponent } from '../datation-editor/datation-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HistoricalDateEditorComponent', () => {
  let component: HistoricalDateEditorComponent;
  let fixture: ComponentFixture<HistoricalDateEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        }
      ],
      declarations: [
        DatationEditorComponent,
        HistoricalDateEditorComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
