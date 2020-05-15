import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographyPartDemoComponent } from './bibliography-part-demo.component';

describe('BibliographyPartDemoComponent', () => {
  let component: BibliographyPartDemoComponent;
  let fixture: ComponentFixture<BibliographyPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliographyPartDemoComponent ]
    })
    .compileComponents();
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
