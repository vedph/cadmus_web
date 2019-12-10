import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFragmentComponent } from './comment-fragment.component';

describe('CommentFragmentComponent', () => {
  let component: CommentFragmentComponent;
  let fixture: ComponentFixture<CommentFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
