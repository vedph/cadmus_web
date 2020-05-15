import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibAuthorsEditorComponent } from './bib-authors-editor.component';

describe('BibAuthorsEditorComponent', () => {
  let component: BibAuthorsEditorComponent;
  let fixture: ComponentFixture<BibAuthorsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibAuthorsEditorComponent ]
    })
    .compileComponents();
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
