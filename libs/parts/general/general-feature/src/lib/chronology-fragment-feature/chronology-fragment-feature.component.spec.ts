import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronologyFragmentFeatureComponent } from './chronology-fragment-feature.component';

describe('ChronologyFragmentFeatureComponent', () => {
  let component: ChronologyFragmentFeatureComponent;
  let fixture: ComponentFixture<ChronologyFragmentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronologyFragmentFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologyFragmentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
