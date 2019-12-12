import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureKeywordsPartDemoComponent } from './feature-keywords-part-demo.component';

describe('FeatureKeywordsPartDemoComponent', () => {
  let component: FeatureKeywordsPartDemoComponent;
  let fixture: ComponentFixture<FeatureKeywordsPartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureKeywordsPartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureKeywordsPartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
