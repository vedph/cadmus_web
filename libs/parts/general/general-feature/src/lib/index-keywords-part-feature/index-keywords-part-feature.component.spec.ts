import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexKeywordsPartFeatureComponent } from './index-keywords-part-feature.component';

describe('IndexKeywordsPartFeatureComponent', () => {
  let component: IndexKeywordsPartFeatureComponent;
  let fixture: ComponentFixture<IndexKeywordsPartFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexKeywordsPartFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexKeywordsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
