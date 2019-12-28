import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitnessesFragmentFeatureComponent } from './witnesses-fragment-feature.component';

describe('WitnessesFragmentFeatureComponent', () => {
  let component: WitnessesFragmentFeatureComponent;
  let fixture: ComponentFixture<WitnessesFragmentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitnessesFragmentFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitnessesFragmentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
