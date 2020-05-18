import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureQuotationsFragmentDemoComponent } from './feature-quotations-fragment-demo.component';

describe('FeatureQuotationsFragmentDemoComponent', () => {
  let component: FeatureQuotationsFragmentDemoComponent;
  let fixture: ComponentFixture<FeatureQuotationsFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureQuotationsFragmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureQuotationsFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
