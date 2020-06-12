import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@cadmus/material';

import { ApparatusFragmentDemoComponent } from './apparatus-fragment-demo.component';
import { ApparatusFragmentComponent } from '../apparatus-fragment/apparatus-fragment.component';
import { UiModule } from '@cadmus/ui';
import { JsonSchemaService } from '@cadmus/core';
import { ApparatusEntryComponent } from '../apparatus-entry/apparatus-entry.component';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ApparatusFragmentDemoComponent', () => {
  let component: ApparatusFragmentDemoComponent;
  let fixture: ComponentFixture<ApparatusFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MaterialModule,
        UiModule,
      ],
      providers: [
        {
          provide: JsonSchemaService,
          useValue: {
            addSchema: () => {},
          },
        },
        {
          provide: NGX_MONACO_EDITOR_CONFIG,
          useValue: {},
        },
      ],
      declarations: [
        ApparatusEntryComponent,
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
