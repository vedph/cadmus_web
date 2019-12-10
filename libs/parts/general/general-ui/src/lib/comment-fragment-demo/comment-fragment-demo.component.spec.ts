import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFragmentDemoComponent } from './comment-fragment-demo.component';

describe('CommentFragmentDemoComponent', () => {
  let component: CommentFragmentDemoComponent;
  let fixture: ComponentFixture<CommentFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentFragmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
