import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsFragmentDemoComponent } from './quotations-fragment-demo.component';
import { UiModule } from '@cadmus/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, JsonSchemaService } from '@cadmus/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@cadmus/material';
import { QuotationsFragmentComponent } from '../quotations-fragment/quotations-fragment.component';
import { QuotationEntryComponent } from '../quotation-entry/quotation-entry.component';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';

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
        QuotationEntryComponent,
        QuotationsFragmentComponent,
        QuotationsFragmentDemoComponent
      ],
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
