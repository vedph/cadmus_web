import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureIndexKeywordsPartDemoComponent } from './feature-index-keywords-part-demo.component';

describe('FeatureIndexKeywordsPartDemoComponent', () => {
  let component: FeatureIndexKeywordsPartDemoComponent;
  let fixture: ComponentFixture<FeatureIndexKeywordsPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureIndexKeywordsPartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureIndexKeywordsPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
