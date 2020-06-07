import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographyPartComponent } from './bibliography-part.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { BibliographyEntryComponent } from '../bibliography-entry/bibliography-entry.component';
import { BibAuthorsEditorComponent } from '../bib-authors-editor/bib-authors-editor.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BibliographyPartComponent', () => {
  let component: BibliographyPartComponent;
  let fixture: ComponentFixture<BibliographyPartComponent>;

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
      declarations: [
        BibAuthorsEditorComponent,
        BibliographyEntryComponent,
        BibliographyPartComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliographyPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
