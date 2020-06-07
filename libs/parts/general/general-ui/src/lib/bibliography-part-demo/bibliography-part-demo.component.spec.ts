import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographyPartDemoComponent } from './bibliography-part-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { BibliographyPartComponent } from '../bibliography-part/bibliography-part.component';
import { BibAuthorsEditorComponent } from '../bib-authors-editor/bib-authors-editor.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BibliographyEntryComponent } from '../bibliography-entry/bibliography-entry.component';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';

describe('BibliographyPartDemoComponent', () => {
  let component: BibliographyPartDemoComponent;
  let fixture: ComponentFixture<BibliographyPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        MaterialModule,
        NoopAnimationsModule,
        UiModule,
      ],
      declarations: [
        BibAuthorsEditorComponent,
        BibliographyEntryComponent,
        BibliographyPartComponent,
        BibliographyPartDemoComponent
      ],
      providers: [
        {
          provide: NGX_MONACO_EDITOR_CONFIG,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliographyPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
