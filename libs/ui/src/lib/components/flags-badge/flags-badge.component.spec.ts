import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsBadgeComponent } from './flags-badge.component';
import { MaterialModule } from '@cadmus/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FlagsBadgeComponent', () => {
  let component: FlagsBadgeComponent;
  let fixture: ComponentFixture<FlagsBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule],
      declarations: [FlagsBadgeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
