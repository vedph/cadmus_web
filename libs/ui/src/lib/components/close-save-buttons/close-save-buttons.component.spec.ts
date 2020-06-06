import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSaveButtonsComponent } from './close-save-buttons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';

describe('CloseSaveButtonsComponent', () => {
  let component: CloseSaveButtonsComponent;
  let fixture: ComponentFixture<CloseSaveButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule],
      declarations: [CloseSaveButtonsComponent],
    }).compileComponents();
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
