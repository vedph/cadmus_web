import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureBibliographyPartDemoComponent } from './feature-bibliography-part-demo.component';

describe('FeatureBibliographyPartDemoComponent', () => {
  let component: FeatureBibliographyPartDemoComponent;
  let fixture: ComponentFixture<FeatureBibliographyPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureBibliographyPartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureBibliographyPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
