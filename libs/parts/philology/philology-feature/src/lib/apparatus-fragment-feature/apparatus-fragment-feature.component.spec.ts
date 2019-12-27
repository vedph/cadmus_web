import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparatusFragmentFeatureComponent } from './apparatus-fragment-feature.component';

describe('ApparatusFragmentFeatureComponent', () => {
  let component: ApparatusFragmentFeatureComponent;
  let fixture: ComponentFixture<ApparatusFragmentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApparatusFragmentFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparatusFragmentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
