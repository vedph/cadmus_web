import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthographyFragmentDemoComponent } from './orthography-fragment-demo.component';

describe('OrthographyFragmentDemoComponent', () => {
  let component: OrthographyFragmentDemoComponent;
  let fixture: ComponentFixture<OrthographyFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthographyFragmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthographyFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
