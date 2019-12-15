import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronologyFragmentDemoComponent } from './chronology-fragment-demo.component';

describe('ChronologyFragmentDemoComponent', () => {
  let component: ChronologyFragmentDemoComponent;
  let fixture: ComponentFixture<ChronologyFragmentDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChronologyFragmentDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologyFragmentDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
