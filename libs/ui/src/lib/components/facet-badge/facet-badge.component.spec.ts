import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetBadgeComponent } from './facet-badge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';

describe('FacetBadgeComponent', () => {
  let component: FacetBadgeComponent;
  let fixture: ComponentFixture<FacetBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MaterialModule],
      declarations: [FacetBadgeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
