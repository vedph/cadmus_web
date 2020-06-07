import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsFragmentDemoComponent } from './quotations-fragment-demo.component';
import { UiModule } from '@cadmus/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@cadmus/material';

describe('QuotationsFragmentDemoComponent', () => {
  let component: QuotationsFragmentDemoComponent;
  let fixture: ComponentFixture<QuotationsFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        NoopAnimationsModule,
        MaterialModule,
        UiModule,
      ],
      declarations: [QuotationsFragmentDemoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationsFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
