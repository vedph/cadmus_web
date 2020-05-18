import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsFragmentFeatureComponent } from './quotations-fragment-feature.component';

describe('QuotationsFragmentFeatureComponent', () => {
  let component: QuotationsFragmentFeatureComponent;
  let fixture: ComponentFixture<QuotationsFragmentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationsFragmentFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationsFragmentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
