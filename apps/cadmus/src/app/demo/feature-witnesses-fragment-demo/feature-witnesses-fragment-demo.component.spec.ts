import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureWitnessesFragmentDemoComponent } from './feature-witnesses-fragment-demo.component';

describe('FeatureWitnessesFragmentDemoComponent', () => {
  let component: FeatureWitnessesFragmentDemoComponent;
  let fixture: ComponentFixture<FeatureWitnessesFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureWitnessesFragmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureWitnessesFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
