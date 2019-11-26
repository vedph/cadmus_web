import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthographyFragmentComponent } from './orthography-fragment.component';

describe('OrthographyFragmentComponent', () => {
  let component: OrthographyFragmentComponent;
  let fixture: ComponentFixture<OrthographyFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthographyFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthographyFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
