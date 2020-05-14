import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographyEntryComponent } from './bibliography-entry.component';

describe('BibliographyEntryComponent', () => {
  let component: BibliographyEntryComponent;
  let fixture: ComponentFixture<BibliographyEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliographyEntryComponent ]
    })
    .compileComponents();
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
