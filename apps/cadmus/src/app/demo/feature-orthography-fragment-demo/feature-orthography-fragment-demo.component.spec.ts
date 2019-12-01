import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureOrthographyFragmentDemoComponent } from './feature-orthography-fragment-demo.component';

describe('FeatureOrthographyFragmentDemoComponent', () => {
  let component: FeatureOrthographyFragmentDemoComponent;
  let fixture: ComponentFixture<FeatureOrthographyFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureOrthographyFragmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureOrthographyFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
