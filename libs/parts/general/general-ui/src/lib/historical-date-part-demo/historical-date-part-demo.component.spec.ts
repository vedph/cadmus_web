import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

import { HistoricalDatePartDemoComponent } from './historical-date-part-demo.component';
import { HistoricalDatePartComponent } from '../historical-date-part/historical-date-part.component';
import { UiModule } from '@cadmus/ui';

describe('HistoricalDatePartDemoComponent', () => {
  let component: HistoricalDatePartDemoComponent;
  let fixture: ComponentFixture<HistoricalDatePartDemoComponent>;

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
        HistoricalDatePartComponent,
        HistoricalDatePartDemoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDatePartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
