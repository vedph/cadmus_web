import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographyEntryComponent } from './bibliography-entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { BibAuthorsEditorComponent } from '../bib-authors-editor/bib-authors-editor.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BibliographyEntryComponent', () => {
  let component: BibliographyEntryComponent;
  let fixture: ComponentFixture<BibliographyEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        CoreModule,
        MaterialModule,
        UiModule,
      ],
      declarations: [
        BibAuthorsEditorComponent,
        BibliographyEntryComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliographyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
