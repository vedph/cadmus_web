import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsPartFeatureComponent } from './keywords-part-feature.component';

describe('KeywordsPartFeatureComponent', () => {
  let component: KeywordsPartFeatureComponent;
  let fixture: ComponentFixture<KeywordsPartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordsPartFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
