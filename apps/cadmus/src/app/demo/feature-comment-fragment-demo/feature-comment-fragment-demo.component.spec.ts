import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCommentFragmentDemoComponent } from './feature-comment-fragment-demo.component';

describe('FeatureCommentFragmentDemoComponent', () => {
  let component: FeatureCommentFragmentDemoComponent;
  let fixture: ComponentFixture<FeatureCommentFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureCommentFragmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureCommentFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
