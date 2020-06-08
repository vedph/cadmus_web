import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';

import { ApparatusFragmentDemoComponent } from './apparatus-fragment-demo.component';
import { ApparatusFragmentComponent } from '../apparatus-fragment/apparatus-fragment.component';
import { UiModule } from '@cadmus/ui';
import { JsonSchemaService } from '@cadmus/core';

describe('ApparatusFragmentDemoComponent', () => {
  let component: ApparatusFragmentDemoComponent;
  let fixture: ComponentFixture<ApparatusFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        UiModule,
      ],
      providers: [
        {
          provide: JsonSchemaService,
          useValue: {},
        },
      ],
      declarations: [
        ApparatusFragmentComponent,
        ApparatusFragmentDemoComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparatusFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
