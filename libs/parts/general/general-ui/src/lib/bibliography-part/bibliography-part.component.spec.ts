import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographyPartComponent } from './bibliography-part.component';

describe('BibliographyPartComponent', () => {
  let component: BibliographyPartComponent;
  let fixture: ComponentFixture<BibliographyPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliographyPartComponent ]
    })
    .compileComponents();
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
