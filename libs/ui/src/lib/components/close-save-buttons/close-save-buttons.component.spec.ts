import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSaveButtonsComponent } from './close-save-buttons.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';
import { HAMMER_LOADER } from '@angular/platform-browser';

describe('CloseSaveButtonsComponent', () => {
  let component: CloseSaveButtonsComponent;
  let fixture: ComponentFixture<CloseSaveButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
      ],
      // https://github.com/angular/components/issues/14668
      providers: [{
        provide: HAMMER_LOADER,
        useValue: () => new Promise(() => {})
      }],
      declarations: [ CloseSaveButtonsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseSaveButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
