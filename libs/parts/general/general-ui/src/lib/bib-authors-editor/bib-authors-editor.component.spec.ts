import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibAuthorsEditorComponent } from './bib-authors-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@cadmus/core';
import { MaterialModule } from '@cadmus/material';
import { UiModule } from '@cadmus/ui';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BibAuthorsEditorComponent', () => {
  let component: BibAuthorsEditorComponent;
  let fixture: ComponentFixture<BibAuthorsEditorComponent>;

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
      declarations: [BibAuthorsEditorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibAuthorsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
