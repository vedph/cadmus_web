import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliographyPartFeatureComponent } from './bibliography-part-feature.component';

describe('BibliographyPartFeatureComponent', () => {
  let component: BibliographyPartFeatureComponent;
  let fixture: ComponentFixture<BibliographyPartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliographyPartFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliographyPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
