import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsFragmentComponent } from './quotations-fragment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, JsonSchemaService } from '@cadmus/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';

describe('QuotationsFragmentComponent', () => {
  let component: QuotationsFragmentComponent;
  let fixture: ComponentFixture<QuotationsFragmentComponent>;

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
      providers: [
        {
          provide: JsonSchemaService,
          useValue: {},
        },
      ],
      declarations: [QuotationsFragmentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationsFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
