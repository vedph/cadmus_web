import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthographyFragmentFeatureComponent } from './orthography-fragment-feature.component';

describe('OrthographyFragmentFeatureComponent', () => {
  let component: OrthographyFragmentFeatureComponent;
  let fixture: ComponentFixture<OrthographyFragmentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthographyFragmentFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthographyFragmentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
